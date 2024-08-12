import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { FilterTasksListDto } from './dto/filter-task-list.dto';

@Injectable()
export class TaskListService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskListDto: CreateTaskListDto) {    
    return this.prisma.taskList.create({
      data: createTaskListDto
    });
  }

  async findAll(filters: FilterTasksListDto) {
    const { name } = filters;
    const where: any = {};

    if (name) where.name = { contains: name, mode: 'insensitive' };
    
    return this.prisma.taskList.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.taskList.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: string, updateTaskListDto: UpdateTaskListDto) {
    return this.prisma.taskList.update({
      where: {
        id: id
      },
      data: updateTaskListDto
    });
  }

  async remove(id: string) {
    return this.prisma.taskList.delete({
      where: {
        id: id
      }
    });
  }
}
