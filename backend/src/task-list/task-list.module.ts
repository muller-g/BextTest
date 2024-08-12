import { Module } from '@nestjs/common';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ PrismaModule ],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
