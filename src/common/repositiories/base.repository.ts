import { Model, Document } from "mongoose";
import { IBaseRepository } from "./base.repository.model";


export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    constructor(private readonly model: Model<T>) {}

    async getAll(queryParams: {
        filter?: Record<string, any>;
        sort?: Record<string, 1 | -1>;
        pagination?: { limit?: number; skip?: number };
        relation?: string[];
    } = {}): Promise<T[]> {
        const { filter = {}, sort, pagination, relation } = queryParams;
        let queryBuilder = this.model.find(filter);

        if (relation) {
            relation.forEach(rel=>{
                queryBuilder = queryBuilder.populate(rel)
            })
        }

        if (sort) {
            queryBuilder = queryBuilder.sort(sort);
        }

        if (pagination?.limit) {
            queryBuilder = queryBuilder.limit(pagination.limit);
        }
        if (pagination?.skip) {
            queryBuilder = queryBuilder.skip(pagination.skip);
        }

        return queryBuilder.exec();
    }

    async getById(_id: string): Promise<T | null> {
        return this.model.findById(_id).exec();
    }

    async insert(data: Partial<T>): Promise<T> {
        const created = new this.model(data);
        return created.save();
    }

    async update(_id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(_id, data, { new: true }).exec();
    }

    async delete(_id: string): Promise<{ deletedCount?: number }> {
        return this.model.deleteOne({ _id }).exec();
    }
}