import { isArray, Length } from 'class-validator';

export interface OutputData {
  version?: string;

  time?: number;

  blocks: OutputBlockData[];
}

export interface OutputBlockData<
  Type extends string = string,
  Data extends object = any,
> {
  id?: string;
  type: Type;
  data: BlockToolData<Data>;

  tunes?: { [name: string]: any };
}

export type BlockToolData<T extends object = any> = T;

export class CreatePostDto {
  @Length(3)
  title: string;

  body: OutputData['blocks'];

  tags?: string;
}
