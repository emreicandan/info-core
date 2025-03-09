import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ParentSchema } from "src/schemas/parent.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Parents',
        schema: ParentSchema
    }])],
    controllers: [],
    providers: [],
    exports: []
})

export class ParentModule { };
