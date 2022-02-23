import { sessionService } from './session';
import { ResponseError } from '../helpers/errors';
import { supabaseClient } from '../libs/supabase';
import { serviceHandler } from '../helpers/serviceHandler';
import { fileIsImage } from '../helpers/validators/fileIsImage';

interface UploadImageDTO {
  bucket: string;
  imageFile: File;
}

interface ImageDTO {
  bucket: string;
  path: string;
}

interface DeleteImagesDTO {
  bucket: string;
  pathsToDelete: string[];
}

export const storageService = {
  async uploadImage({ bucket, imageFile }: UploadImageDTO) {
    const { data, error } = await serviceHandler(async () => {
      const { error: sessionError, data: session } =
        await sessionService.verifyUser();

      if (sessionError || !session || !session.user) {
        throw new ResponseError({ ...sessionError });
      }

      if (!fileIsImage(imageFile)) {
        throw new ResponseError({
          title: `Erro de extensão`,
          description: 'Extensões de arquivos suportadas: PNG, JPEG e GIF',
        });
      }

      const { user } = session;
      const path = `${user.email}/${
        new Date().getTime() + '_' + imageFile.name
      }`;

      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage.from(bucket).upload(path, imageFile, {
          cacheControl: '3600',
        });

      if (uploadError || !uploadData) {
        throw new ResponseError({ code: 500, ...uploadError });
      }

      return { ...uploadData, path };
    });

    return { data, error };
  },
  getPublicURL({ bucket, path }: ImageDTO) {
    const { publicURL } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicURL;
  },
  async deleteImages({ bucket, pathsToDelete }: DeleteImagesDTO) {
    const { data, error } = await serviceHandler(async () => {
      const { data: deleteData, error: deleteError } =
        await supabaseClient.storage.from(bucket).remove(pathsToDelete);

      if (deleteError) {
        throw new ResponseError({ code: 500, ...deleteError });
      }

      return deleteData;
    });

    return { data, error };
  },
};
