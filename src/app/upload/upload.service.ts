import { Injectable } from '@nestjs/common';
import { UploadFileType } from './upload.interface';
import * as fs from 'fs/promises';

@Injectable()
export class UploadService {
  async saveFile(
    filePath: string,
    fileName: string,
    fileType: UploadFileType,
    fileContent: string,
  ) {
    await fs.writeFile(filePath + fileName + fileType, fileContent);
  }

  async getFileContent(
    filePath: string,
    fileName: string,
    fileType: UploadFileType,
  ): Promise<string> {
    return await fs.readFile(filePath + fileName + fileType, 'utf-8');
  }
}
