import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

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
  ): Promise<JwtPayload> {
    return this.authService.login(credentials);
  }
}
