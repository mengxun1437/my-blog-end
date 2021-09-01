import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class TagModule {}
