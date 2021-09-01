import { IsNotEmpty, Length } from 'class-validator';
import { IsIn } from '../../exceptions/validation.exception';
import { BlogStatus } from './blog.interface';

export class DtoSaveBlog {
  @IsNotEmpty({ message: '文章标题不能为空' })
  @Length(2, 50, { message: '文章标题长度不合法' })
  title: string;
  blogId?: string;
  cover?: string;
  tags?: string;
  @IsNotEmpty({ message: '博文状态不可为空' })
  @IsIn(Object.values(BlogStatus), { message: '博文状态不合法' })
  status: BlogStatus;
}
