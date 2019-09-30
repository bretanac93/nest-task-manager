import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  all(): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  one(@Param('id') id: string): Task {
    return this.tasksService.getOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch('/:id/status')
  update(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.update(id, status);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Task[] {
    return this.tasksService.remove(id);
  }
}
