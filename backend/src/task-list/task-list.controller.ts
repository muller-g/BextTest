import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { FilterTasksListDto } from './dto/filter-task-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TaskLists')
@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  async create(@Body() createTaskListDto: CreateTaskListDto) {
      return await this.taskListService.create(createTaskListDto);
  }

  @Get()
  findAll(@Query() filters: FilterTasksListDto) {
    return this.taskListService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskListService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskListDto: UpdateTaskListDto) {
    return this.taskListService.update(id, updateTaskListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListService.remove(id);
  }
}
