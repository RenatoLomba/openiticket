import { ResponseError } from '../helpers/errors';
import { supabaseClient } from '../libs/supabase';
import { sessionService } from './session';

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
    let data: { Key: string; path: string } | null = null;
    let error: ResponseError | null = null;

    try {
      const { error: sessionError, session } = sessionService.verifyUser();

      if (sessionError || !session || !session.user) {
        throw new ResponseError(
          sessionError?.code,
          sessionError?.title,
          sessionError?.description,
        );
      }

      if (
        imageFile.type !== 'image/jpeg' &&
        imageFile.type !== 'image/png' &&
        imageFile.type !== 'image/gif'
      ) {
        throw new ResponseError(
          400,
          `Erro de extensão`,
          'Extensões de arquivos suportadas: PNG e JPEG',
        );
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
        throw new ResponseError(500, uploadError?.name, uploadError?.message);
      }

      data = { ...uploadData, path };
    } catch (ex) {
      error = ex as ResponseError;
    }

    return { data, error };
  },
  getPublicURL({ bucket, path }: ImageDTO) {
    const { publicURL } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicURL;
  },
  async deleteImages({ bucket, pathsToDelete }: DeleteImagesDTO) {
    let data: unknown | null = null;
    let error: ResponseError | null = null;

    try {
      const { data: deleteData, error: deleteError } =
        await supabaseClient.storage.from(bucket).remove(pathsToDelete);

      if (deleteError) {
        throw new ResponseError(500, deleteError.name, deleteError.message);
      }

      data = deleteData;
    } catch (ex) {
      error = ex as ResponseError;
    }

    return { data, error };
  },
};
