import { IsNotEmpty } from 'class-validator';
import { IsIn } from '../../exceptions/validation.exception';
import { UploadFileType } from './upload.interface';

export class DtoUploadNewBlog {
  @IsNotEmpty({ message: '文件名不能为空' })
  fileName: string;
  @IsNotEmpty({ message: '文件类型不能为空' })
  @IsIn(Object.values(UploadFileType), { message: '文件类型不合法' })
  fileType: UploadFileType;
  @IsNotEmpty({ message: '文件内容不能为空' })
  fileContent: string;
}
