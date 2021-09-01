import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from '../upload/upload.service';
import { Blog } from './blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UploadService],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class BlogModule {}
