import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async getAllBlogs(): Promise<any[]> {
    return await this.blogRepository.findAndCount();
  }

  async getBlogByBlogId(blogId: string): Promise<Blog> {
    return await this.blogRepository.findOne({ blogId });
  }

  async saveBlog(blog: Blog) {
    await this.blogRepository.save(blog);
  }
}
