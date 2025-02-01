import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { Document } from "mongoose";
import { BaseService } from "./base.service";


@Controller()
export class BaseController<T extends Document> {
    constructor(private readonly service: BaseService<T> , private path : string) {}

    @Get()
    async getAll(
        @Res() res: Response,
        @Query() queryParams?: {
            filter?: Record<string, any>;
            sort?: Record<string, 1 | -1>;
            pagination?: { limit?: number; skip?: number };
            relation?: string[];
        }
    ) {
        const items = await this.service.getAll(queryParams);
        return res.status(HttpStatus.OK).json(items);
    }

    @Get(":_id")
    async getById(@Param("_id") _id: string, @Res() res: Response): Promise<any> {
        const item = await this.service.getById(_id);
        if (item) {
            return res.status(HttpStatus.OK).json(item);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: `${this.path} not found` });
        }
    }

    @Post()
    async create(@Body() data: Partial<T>, @Res() res: Response): Promise<any> {
        const createdItem = await this.service.insert(data);
        return res.status(HttpStatus.CREATED).json(createdItem);
    }

    @Put(":_id")
    async update(
        @Param("_id") _id: string,
        @Body() data: Partial<T>,
        @Res() res: Response
    ): Promise<any> {
        const updatedItem = await this.service.update(_id, data);
        if (updatedItem) {
            return res.status(HttpStatus.OK).json(updatedItem);
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: `${this.path} not found` });
        }
    }

    @Delete(":_id")
    async remove(@Param("_id") _id: string, @Res() res: Response): Promise<any> {
        const result = await this.service.remove(_id);
        if (result) {
            return res.status(HttpStatus.OK).json({ message: `${this.path} deleted successfully` });
        } else {
            return res.status(HttpStatus.NOT_FOUND).json({ message: `${this.path} not found` });
        }
    }
}