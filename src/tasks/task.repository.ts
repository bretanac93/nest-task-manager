import { Repository, EntityRepository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async filter(filterDto: GetTasksFilterDto) {
    const { searchTerm, status } = filterDto;
    const query = this.createQueryBuilder('task');

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

  async persist(dto: CreateTaskDto): Promise<Task> {
    const task = this.create(dto);
    await task.save();
    return task;
  }
}
