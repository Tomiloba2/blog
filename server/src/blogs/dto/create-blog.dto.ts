import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    imgUrl?: string;

    @IsString()
    @IsOptional()
    imgId?: string;

    @IsNotEmpty()
    @IsString()
    userId:string

}