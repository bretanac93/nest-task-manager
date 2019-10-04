import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async get(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.filter(filterDto, user);
  }

  async getOne(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.persist(createTaskDto, user);
  }

  async remove(id: number, user: User): Promise<void> {
    const { affected } = await this.taskRepository.delete({
      id,
      userId: user.id,
    });
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async update(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getOne(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
