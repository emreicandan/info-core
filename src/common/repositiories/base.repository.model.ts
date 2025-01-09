export interface IBaseRepository<T> {
    getAll(queryParams?: {
        filter?: Record<string, any>;
        sort?: Record<string, 1 | -1>;
        pagination?: { limit?: number; skip?: number };
        relation?: string[];
    }): Promise<T[]>;
    getById(_id: string): Promise<T | null>;
    insert(data: Partial<T>): Promise<T>;
    update(_id: string, data: Partial<T>): Promise<T | null>;
    delete(_id: string): Promise<{ deletedCount?: number }>;
}