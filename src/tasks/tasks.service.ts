import * as uuid from 'uuid/v1';
import { Injectable } from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
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
