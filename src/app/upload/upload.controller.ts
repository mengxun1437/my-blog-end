import { Body, Controller, Post } from '@nestjs/common';
import { error, ResponseConfig, success } from '../../response';
import { DtoUploadNewBlog } from './upload.dto';
import { UploadService } from './upload.service';
import { baseFilePath, FilePath } from './upload.interface';
import { SuccessMsg, ErrorMsg } from '../../exceptions/types.exception';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  async uploadFile(@Body() body: DtoUploadNewBlog): Promise<ResponseConfig> {
    try {
      await this.uploadService.saveFile(
        baseFilePath + FilePath[body.fileType],
        body.fileName,
        body.fileType,
        body.fileContent,
      );
      return success(SuccessMsg.FILE_SAVE_SUCCESS, {});
    } catch {
      return error(ErrorMsg.FILE_SAVE_ERROR);
    }
  }
}
