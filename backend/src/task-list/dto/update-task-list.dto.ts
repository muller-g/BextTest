import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskListDto } from './create-task-list.dto';

export class UpdateTaskListDto extends PartialType(CreateTaskListDto) {}
