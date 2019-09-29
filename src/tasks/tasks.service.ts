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
}
