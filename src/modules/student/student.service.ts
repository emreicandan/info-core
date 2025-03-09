import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/base.service";
import { IStudent } from "src/models/student";
import { StudentRepository } from "./student.repository";

@Injectable()
export class StudentService extends BaseService<IStudent> {
    constructor(
        private readonly studentRepository: StudentRepository
    ) {
        super(studentRepository)
    }
};