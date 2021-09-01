import { BlogStatus } from './blog.interface';

export class DtoSaveBlog {
  title?: string;
  blogId?: string;
  cover?: string;
  tags?: string;
  status?: BlogStatus;
}
