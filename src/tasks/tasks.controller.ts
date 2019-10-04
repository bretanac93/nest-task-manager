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
  ParseIntPipe,
} from '@nestjs/common';

import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  get(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (!Object.keys(filterDto).length) {
      return this.tasksService.getAll();
    }
    return this.tasksService.filter(filterDto);
  }

  @Get('/:id')
  async one(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch('/:id/status')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.update(id, status);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Task[]> {
    return this.tasksService.remove(id);
  }
}
