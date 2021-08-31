import { Body, Controller, Get, Put } from '@nestjs/common';
import { error, ResponseConfig, success } from '../../response';
import { BlogService } from './blog.service';
import { SuccessMsg, ErrorMsg } from '../../exceptions/types.exception';
import { DtoSaveBlog } from './blog.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

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
}
