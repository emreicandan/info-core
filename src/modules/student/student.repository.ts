import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/common/base.repository";
import { IStudent } from "src/models/student";

@Injectable()
export class StudentRepository extends BaseRepository<IStudent> {
    constructor(
        @InjectModel("Students")
        private readonly studentModel: Model<IStudent>
    ) {
        super(studentModel)
    }
}