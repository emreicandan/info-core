import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IIdentity } from 'src/models/identity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    birth_date: Date;
    password: string;
    role: string;
  }): Promise<IIdentity> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: {
    email: string,
    password: string
  }): Promise<{token:string}> {
    return this.authService.login(body);
  }
}
