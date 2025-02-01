import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/models/user';
import { UserRepository } from './user.repository';
import { BaseService } from 'src/common/base.service';


@Injectable()
export class UserService extends BaseService<IUser> {
    constructor(private readonly userRepository : UserRepository) {
        super(userRepository)
    }
}
