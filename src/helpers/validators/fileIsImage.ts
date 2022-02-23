export const fileIsImage = (file: File) => {
  return /\.(gif|jpe?g|png)$/i.test(file.name);
};
