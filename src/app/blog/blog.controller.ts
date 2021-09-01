import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { error, ResponseConfig, success } from '../../response';
import { BlogService } from './blog.service';
import { SuccessMsg, ErrorMsg } from '../../exceptions/types.exception';
import { DtoSaveBlog } from './blog.dto';
import { v4 as uuidv4 } from 'uuid';
import { UploadService } from '../upload/upload.service';
import {
  baseFilePath,
  FilePath,
  UploadFileType,
} from '../upload/upload.interface';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly uploadService: UploadService,
  ) {}

  /**
   * 获取所有的博文信息
   */
  @Get()
  async getAllBlogs(): Promise<ResponseConfig> {
    try {
      const blogs = await this.blogService.getAllBlogs();
      return success(SuccessMsg.BLOG_LIST_GET_SUCCESS, {
        list: blogs[0],
        length: blogs[1],
      });
    } catch {
      return error(ErrorMsg.BLOG_LIST_GET_ERROR);
    }
  }

  /**
   * 保存一篇博文
   */
  @Put()
  async addNewBlog(@Body() body: DtoSaveBlog): Promise<ResponseConfig> {
    try {
      const date = new Date();
      let blog;
      if (body.blogId) {
        blog = await this.blogService.getBlogByBlogId(body.blogId);
        await this.blogService.saveBlog({
          ...blog,
          ...body,
          updated: date,
        });
      } else {
        blog = {
          blogId: uuidv4(),
          ...body,
          created: date,
          updated: date,
        };
        await this.blogService.saveBlog(blog);
      }
      return success(SuccessMsg.BLOG_SAVE_SUCCESS, { id: blog.blogId });
    } catch {
      return error(ErrorMsg.BLOG_SAVE_ERROR);
    }
  }

  /**
   * 获取博文的具体内容
   */
  @Get(':id')
  async getBlogContent(@Param() params): Promise<ResponseConfig> {
    try {
      const blog = await this.blogService.getBlogByBlogId(`${params.id}`);
      if (!blog) {
        return error(ErrorMsg.BLOG_NOT_EXIST_ERROR);
      }
      const content = await this.uploadService.getFileContent(
        baseFilePath + FilePath[UploadFileType.MD],
        params.id,
        UploadFileType.MD,
      );
      return success(SuccessMsg.BLOG_CONTENT_GET_SUCCESS, {
        blog,
        content,
      });
    } catch (e) {
      console.log(e);
      return error(ErrorMsg.BLOG_CONTENT_GET_ERROR);
    }
  }
}
