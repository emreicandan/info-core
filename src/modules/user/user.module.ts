import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Users',
        schema: UserSchema
    }])],
    controllers: [UserController],
    providers: [UserService , UserRepository],
    exports:[UserService]
})

export class UserModule { }
