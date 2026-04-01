import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  MinLength,
} from "class-validator";

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  tagIds?: number[];
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  tagIds?: number[];
}

export class PostQueryDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  tagId?: number;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  page_size?: number = 10;
}
