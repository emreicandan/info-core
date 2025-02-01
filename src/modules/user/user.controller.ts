import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from 'src/models/user';
import { BaseController } from 'src/common/base.controller';

@Controller('users')
export class UserController extends BaseController<IUser> {
    constructor(private readonly userService: UserService) {
        super(userService , 'User')
    }
}
