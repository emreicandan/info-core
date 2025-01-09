import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from 'tools/models/user';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(
      @Res() res: Response,
      @Query() queryParams?: {
        filter?: Record<string, any>;
        sort?: Record<string, 1 | -1>;
        pagination?: { limit?: number; skip?: number };
        relation?: string[];
      }
    ) {
        const users = await this.userService.getAll(queryParams);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':_id')
    async getUserById(@Param('_id') _id: string, @Res() res: Response): Promise<any> {
        const user = await this.userService.getById(_id);
        if (user) {
            return res.status(HttpStatus.OK).json(user);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
    }

    @Post()
    async createUser(@Body() user: IUser, @Res() res: Response): Promise<any> {
        const createdUser = await this.userService.insert(user);
        return res.status(HttpStatus.CREATED).json(createdUser);
    }

    @Put(':_id')
    async updateUser(
      @Param('_id') _id: string, 
      @Body() data: Partial<IUser>, 
      @Res() res: Response
    ): Promise<any> {
        const updatedUser = await this.userService.update(_id, data);
        if (updatedUser) {
            return res.status(HttpStatus.OK).json(updatedUser);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
    }

    @Delete(':_id')
    async removeUser(@Param('_id') _id: string, @Res() res: Response): Promise<any> {
        const result = await this.userService.remove(_id);
        if (result) {
            return res.status(HttpStatus.OK).json({ message: 'User deleted successfully' });
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
    }
}
