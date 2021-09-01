import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { error, ResponseConfig, success } from '../../response';
import { TagService } from './tag.service';
import { ErrorMsg, SuccessMsg } from '../../exceptions/types.exception';
import { DtoSaveTag, DtoDeleteTag } from './tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags(): Promise<ResponseConfig> {
    try {
      const tags = await this.tagService.getAllTags();
      return success(SuccessMsg.TAG_LIST_GET_SUCCESS, {
        list: tags[0],
        length: tags[1],
      });
    } catch {
      return error(ErrorMsg.TAG_LIST_GET_ERROR);
    }
  }

  @Put()
  async saveTag(@Body() body: DtoSaveTag): Promise<ResponseConfig> {
    try {
      if (await this.tagService.existTagByName(body.name)) {
        return error(ErrorMsg.TAG_NAME_EXIST_ERROR);
      }
      const tagId = body.tagId;
      let tag;
      const date = new Date();
      if (tagId !== undefined) {
        const preTag = await this.tagService.getTagById(tagId);
        if (!preTag) {
          return error(ErrorMsg.TAG_ID_NOT_EXIST_ERROR);
        }
        tag = {
          ...preTag,
          name: body.name,
          updated: date,
        };
      } else {
        tag = {
          name: body.name,
          created: date,
          updated: date,
        };
      }
      this.tagService.saveTags(tag);
      return success(SuccessMsg.TAG_SAVE_SUCCESS, { tag });
    } catch {
      return error(ErrorMsg.TAG_SAVE_ERROR);
    }
  }

  @Delete()
  async deleteByIdArray(@Body() body: DtoDeleteTag): Promise<ResponseConfig> {
    try {
      if (body.tagIds) {
        body.tagIds.forEach(async (tagId: number) => {
          await this.tagService.deleteTag(tagId);
        });
      }
      return success(SuccessMsg.TAG_DELETE_SUCCESS);
    } catch {
      return error(ErrorMsg.TAG_DELETE_ERROR);
    }
  }
}
