import { ResponseError } from '../helpers/errors';
import { supabaseClient } from '../libs/supabase';
import { fileIsImage } from '../helpers/validators/fileIsImage';

import {
  DeleteImagesDTO,
  DeleteImagesResponse,
  ImageDTO,
  UploadImageDTO,
  UploadResponse,
} from './types/storage.types';

export const storageService = {
  async uploadImage({
    bucket,
    imageFile,
  }: UploadImageDTO): Promise<UploadResponse> {
    const session = supabaseClient.auth.session();

    if (!session || !session.user) {
      throw new ResponseError({ title: 'Usuário não autenticado' });
    }

    if (!fileIsImage(imageFile)) {
      throw new ResponseError({
        title: `Erro de extensão`,
        description: 'Extensões de arquivos suportadas: PNG, JPEG e GIF',
      });
    }

    const { user } = session;
    const path = `${user.email}/${new Date().getTime() + '_' + imageFile.name}`;

    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .upload(path, imageFile, {
        cacheControl: '3600',
      });

    if (error || !data) {
      throw new ResponseError({
        code: 500,
        title: error?.name,
        description: error?.message,
      });
    }

    return { ...data, path };
  },
  getPublicURL({ bucket, path }: ImageDTO) {
    const { publicURL } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicURL;
  },
  async deleteImages({
    bucket,
    pathsToDelete,
  }: DeleteImagesDTO): Promise<DeleteImagesResponse> {
    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .remove(pathsToDelete);

    if (!data || error) {
      throw new ResponseError({
        code: 500,
        title: error?.name,
        description: error?.message,
      });
    }

    return { bucket, pathsDeleted: pathsToDelete };
  },
};
