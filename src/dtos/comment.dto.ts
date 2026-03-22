import { IsString, IsNumber, IsOptional, MinLength } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content!: string;

  @IsNumber()
  postId!: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
