import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  password: string;
}
