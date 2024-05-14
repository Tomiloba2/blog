import { IsString, IsEmail, IsNotEmpty, IsStrongPassword, IsDateString, IsOptional } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;


    @IsString()
    @IsOptional()
    img?: string;

    @IsString()
    @IsOptional()
    imgId?: string;

    @IsString()
    @IsOptional()
    @IsDateString()
    dob?: string | Date;

    @IsString()
    @IsOptional()
    @IsDateString()
    createdAt?: string | Date;

    @IsString()
    @IsOptional()
    @IsDateString()
    updatedAt?: string | Date

    @IsOptional()
    Blog?: any

}