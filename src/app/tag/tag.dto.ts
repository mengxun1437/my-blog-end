import { IsNotEmpty } from 'class-validator';
export class DtoSaveTag {
  tagId?: number;
  @IsNotEmpty({ message: '标签不能为空' })
  name: string;
}

export class DtoDeleteTag {
  tagIds: number[];
}
