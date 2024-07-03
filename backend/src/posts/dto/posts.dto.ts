import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostsPayloadDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
