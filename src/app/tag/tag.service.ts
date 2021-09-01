import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async getAllTags(): Promise<any[]> {
    return await this.tagRepository.findAndCount();
  }

  async saveTags(tag: Tag): Promise<Tag> {
    return await this.tagRepository.save(tag);
  }

  async getTagById(tagId: number): Promise<Tag> {
    return await this.tagRepository.findOne({ tagId });
  }

  async existTagByName(name: string): Promise<boolean> {
    const tag = await this.tagRepository.findOne({ name });
    if (tag) {
      return true;
    } else {
      return false;
    }
  }

  async deleteTag(tagId: number) {
    try {
      await this.tagRepository.delete(tagId);
    } catch {}
  }
}
