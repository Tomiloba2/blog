import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    imgUrl?: string;

    @IsString()
    imgId?: string;

}