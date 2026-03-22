import { IsString, IsEmail, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(3)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  avatar?: string;

  @IsString()
  bio?: string;
}
