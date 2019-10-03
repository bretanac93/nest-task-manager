import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  get(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (!Object.keys(filterDto).length) {
      return this.tasksService.getAll();
    }
    return this.tasksService.filter(filterDto);
  }

  @Get('/:id')
  one(@Param('id') id: string): Task {
    return this.tasksService.getOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch('/:id/status')
  update(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.update(id, status);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Task[] {
    return this.tasksService.remove(id);
  }
}
