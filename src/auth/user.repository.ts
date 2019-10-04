import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(dto: AuthCredentialsDto): Promise<void> {
    const user = this.create(dto);
    await user.save();
  }
}
