import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  displayName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
