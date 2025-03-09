import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ParentSchema } from "src/schemas/parent.schema";
import { ParentController } from "./parent.controller";
import { ParentService } from "./parent.service";
import { ParentRepository } from "./parent.repository";

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Parents',
        schema: ParentSchema
    }])],
    controllers: [ParentController],
    providers: [ParentService, ParentRepository],
    exports: [ParentService, ParentRepository]
})

export class ParentModule { };
