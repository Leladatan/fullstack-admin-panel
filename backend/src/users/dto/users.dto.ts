import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersPayloadDto {
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  patronymic: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
