import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTasksDto } from './dto/filter-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto
    });
  }

  async findAll(filters: FilterTasksDto) {
    const { title, description, status, due_date } = filters;
    const where: any = {};

    if (title) where.title = { contains: title, mode: 'insensitive' };

    if (description) where.description = { contains: description, mode: 'insensitive' };
    
    if (status) where.status = status;
    
    if (due_date) where.due_date = new Date(due_date);
    
    return this.prisma.task.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id: id
      }
    });
  }

  async findByTaskList(id: string, filters: FilterTasksDto) {
    const { title, description, status, due_date } = filters;
    const where: any = {
      task_list: id
    };

    if (title) where.title = { contains: title, mode: 'insensitive' };

    if (description) where.description = { contains: description, mode: 'insensitive' };
    
    if (status) where.status = status;
    
    if (due_date) where.due_date = new Date(due_date);
    
    return this.prisma.task.findMany({ where });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id: id
      },
      data: updateTaskDto
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id: id
      }
    });
  }
}
