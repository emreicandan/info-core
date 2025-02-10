import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../common/base.repository";
import { Document } from "mongoose";


@Injectable()
export class BaseService<T extends Document> {
    constructor(private readonly repository: BaseRepository<T>) { 
    }

    async getAll(queryParams?: {
        filter?: Record<string, any>;
        sort?: Record<string, 1 | -1>;
        pagination?: { limit?: number; skip?: number };
        relation?: string[];
    }): Promise<T[]> {
        return this.repository.getAll(queryParams);
    }

    async getById(_id: string) {
        return this.repository.getById(_id);
    }

    async insert(data: Partial<T>) {
        return this.repository.insert(data);
    }

    async update(_id: string, data: Partial<T>) {
        return this.repository.update(_id, data);
    }

    async remove(_id: string) {
        return this.repository.delete(_id);
    }
}
