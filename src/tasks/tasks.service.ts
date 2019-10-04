import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async get(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.filter(filterDto);
  }

  async getOne(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.persist(createTaskDto);
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.taskRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async update(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getOne(id);
    task.status = status;
    await task.save();
    return task;
  }
}
