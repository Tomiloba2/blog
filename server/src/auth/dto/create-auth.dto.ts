import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
