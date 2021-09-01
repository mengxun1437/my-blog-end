export enum UploadFileType {
  PNG = '.png',
  JPG = '.jpg',
  MD = '.md',
}

export const baseFilePath = 'd://myblog/files';

export const FilePath = {
  [UploadFileType.MD]: '/md/',
  [UploadFileType.PNG]: '/png/',
};
