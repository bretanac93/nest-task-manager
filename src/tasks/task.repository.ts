import { Repository, EntityRepository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async persist(dto: CreateTaskDto): Promise<Task> {
    const task = this.create(dto);
    await task.save();
    return task;
  }
}
