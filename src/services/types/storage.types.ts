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

interface UploadResponse {
  Key: string;
  path: string;
}

interface DeleteImagesResponse {
  bucket: string;
  pathsDeleted: string[];
}

export type {
  UploadImageDTO,
  ImageDTO,
  DeleteImagesDTO,
  UploadResponse,
  DeleteImagesResponse,
};
