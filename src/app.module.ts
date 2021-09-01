import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './app/blog/blog.controller';
import { BlogService } from './app/blog/blog.service';
import { BlogModule } from './app/blog/blog.module';
import { mysqlConfig } from './config';
import { UploadController } from './app/upload/upload.controller';
import { UploadService } from './app/upload/upload.service';
import { UploadModule } from './app/upload/upload.module';
import { TagService } from './app/tag/tag.service';
import { TagModule } from './app/tag/tag.module';
import { TagController } from './app/tag/tag.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    BlogModule,
    UploadModule,
    TagModule,
  ],
  controllers: [BlogController, UploadController, TagController],
  providers: [BlogService, UploadService, TagService],
})
export class AppModule {}
