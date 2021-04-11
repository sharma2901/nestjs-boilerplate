import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter valid email.' })
  email: string;
  @IsNotEmpty()
  password: string;
}
