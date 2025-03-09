import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "src/schemas/student.schema";
import { StudentService } from "./student.service";
import { StudentRepository } from "./student.repository";
import { StudentController } from "./student.controller";

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Students',
        schema: StudentSchema
    }])],
    controllers: [StudentController],
    providers: [StudentService,StudentRepository],
    exports: [StudentService,StudentRepository]
})

export class StudentModule { };