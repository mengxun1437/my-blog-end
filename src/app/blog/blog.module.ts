import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UploadService],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class BlogModule {}
