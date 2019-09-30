import * as uuid from 'uuid/v1';
import { Injectable } from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  filter(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        t => t.title.includes(search) || t.description.includes(search),
      );
    }
    return tasks;
  }

  getOne(id: string): Task {
    return this.tasks.find(t => t.id === id);
  }

  create({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.Open,
    };
    this.tasks.push(task);
    return task;
  }

  remove(id: string): Task[] {
    return this.tasks.filter(t => t.id !== id);
  }

  update(id: string, status: TaskStatus) {
    const task = this.getOne(id);
    task.status = status;
    return task;
  }
}
