import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'tools/schemas/user.schema';
import { UserRepository } from './user.repository';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Users',
        schema: UserSchema
    }])],
    controllers: [UserController],
    providers: [UserService , UserRepository],
})

export class UserModule { }
