import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    blogId: string;

    blog: Prisma.blogCreateNestedOneWithoutCommentInput;
    User: Prisma.UserCreateNestedOneWithoutCommentInput;

}
