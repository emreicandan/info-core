import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base.controller";
import { IStudent } from "src/models/student";
import { StudentService } from "./student.service";

@Controller('student')
export class StudentController extends BaseController<IStudent>{
    constructor(private readonly studentService: StudentService) {
        super(studentService , "Student")
    }    
}