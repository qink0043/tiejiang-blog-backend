import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  name!: string;
}

export class CreateTagDto {
  @IsString()
  @MinLength(1)
  name!: string;
}
