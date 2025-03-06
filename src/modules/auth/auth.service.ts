import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { IdentityRepository } from '../identity/IdentityRepository';
import { IIdentity } from 'src/models/identity';
import { JwtService } from '@nestjs/jwt';
import { AuthValidation } from './auth.validation';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly identityRepository: IdentityRepository,
    private readonly jwtService: JwtService,
    private readonly authValidation: AuthValidation
  ) { }

  async register(body: {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    birth_date: Date;
    password: string;
    role: string;
  }): Promise<IIdentity> {
    const user = {
      name: body.name,
      surname: body.surname,
      email: body.email,
      phone_number: body.phone_number,
      birth_date : new Date(body.birth_date)
    };

    await this.authValidation.isExistsIdentity(body.email);

    const createdUser = await this.userService.insert(user);
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const identityData = {
      user: createdUser._id,
      identifier: createdUser.email,
      password: hashedPassword,
      role: body.role,
    };

    return this.identityRepository.insert(identityData);
  }

  async login(body: { email: string; password: string }) {
    const [identity] = await this.identityRepository.getAll({ filter: { identifier: body.email } , relation: ['user']});
    if (!identity) {
      console.log('error')
    }
    
    const isPasswordValid = await bcrypt.compare(body.password, identity.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Password does not match please try again')
    }
    const payload = { sub: identity.user, email: identity.identifier, role: identity.role, audit: 'info-core' };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
