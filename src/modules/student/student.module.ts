import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "src/schemas/student.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Students',
        schema: StudentSchema
    }])],
    controllers: [],
    providers: [],
    exports: []
})

export class StudentModule { };