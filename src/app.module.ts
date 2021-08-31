import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './app/blog/blog.controller';
import { BlogService } from './app/blog/blog.service';
import { BlogModule } from './app/blog/blog.module';
import { mysqlConfig } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConfig), BlogModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule {}
