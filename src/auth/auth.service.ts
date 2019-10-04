import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(credentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.register(credentials);
  }

  async login(credentials: AuthCredentialsDto): Promise<{ token: string }> {
    const username = await this.userRepository.validateUserPassword(
      credentials,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
