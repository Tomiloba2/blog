import { PartialType } from '@nestjs/mapped-types';
import { CreateReplyDto } from './create-replies.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
