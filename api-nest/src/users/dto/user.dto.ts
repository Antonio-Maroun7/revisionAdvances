import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { toNumber, trim } from '../../common/transforms.js';

const MAX_AGE = 150;

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(trim)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(trim)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(trim)
  email: string;

  @IsOptional()
  @Transform(toNumber)
  @IsInt()
  @Min(0)
  @Max(MAX_AGE)
  age?: number | null;
}
