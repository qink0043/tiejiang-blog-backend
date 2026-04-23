import { IsString, IsNumber, IsOptional, IsEmail, MinLength, IsEnum } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content!: string;

  @IsEmail()
  email!: string;

  @IsNumber()
  postId!: number;

  @IsOptional()
  @IsEnum(["text", "doodle"])
  type?: "text" | "doodle";

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
