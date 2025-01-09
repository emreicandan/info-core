import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'tools/models/user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository : UserRepository) {}

    async getAll(queryParams?: {
        filter?: Record<string, any>;
        sort?: Record<string, 1 | -1>;
        pagination?: { limit?: number; skip?: number };
        relation?: string[];
    }) {
        return this.userRepository.getAll(queryParams);
    }

    async getById(_id: string) {
        return this.userRepository.getById(_id);
    }

    async insert(data: Partial<IUser>) {
        return this.userRepository.insert(data);
    }

    async update(_id: string, data: Partial<IUser>) {
        return this.userRepository.update(_id, data);
    }

    async remove(_id: string) {
        return this.userRepository.delete(_id);
    }
}
