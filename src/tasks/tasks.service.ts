import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
  async filter({ searchTerm, status }: GetTasksFilterDto): Promise<Task[]> {
    let criteria = {};
    if (status) {
      criteria = { ...criteria, status };
    }
    if (searchTerm) {
      criteria = { ...criteria, searchTerm };
    }
    return this.taskRepository.find();
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

  async remove(id: number): Promise<Task[]> {
    const { affected } = await this.taskRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
    return this.getAll();
  }

  async update(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getOne(id);
    task.status = status;
    await task.save();
    return task;
  }
}
