import { Repository, EntityRepository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async filter(filterDto: GetTasksFilterDto, user: User) {
    const { searchTerm, status } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (searchTerm) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${searchTerm}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async persist(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({
      ...dto,
      user,
    });
    await task.save();

    delete task.user;

    return task;
  }
}
