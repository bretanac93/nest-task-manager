import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(
    @Body(ValidationPipe) credentials: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) credentials: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.login(credentials);
  }
  @Get('/profile')
  @UseGuards(AuthGuard())
  profile(@GetUser() user: User) {
    return {
      username: user.username,
    };
  }
}
