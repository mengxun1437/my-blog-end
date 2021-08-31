import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class BlogModule {}
