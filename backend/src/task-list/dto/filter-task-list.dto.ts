import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskListDto } from './create-task-list.dto';

export class FilterTasksListDto extends PartialType(CreateTaskListDto) {}
