import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './app/blog/blog.controller';
import { BlogService } from './app/blog/blog.service';
import { BlogModule } from './app/blog/blog.module';
import { mysqlConfig } from './config';
import { UploadController } from './app/upload/upload.controller';
import { UploadService } from './app/upload/upload.service';
import { UploadModule } from './app/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConfig), BlogModule, UploadModule],
  controllers: [BlogController, UploadController],
  providers: [BlogService, UploadService],
})
export class AppModule {}
