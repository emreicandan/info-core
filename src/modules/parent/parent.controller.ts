import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base.controller";
import { IParent } from "src/models/parent";
import { ParentService } from "./parent.service";

@Controller('Parent')
export class ParentController extends BaseController<IParent> {
    constructor(
        private readonly parentService: ParentService
    ) {
        super(
            parentService,
            'Parent'
        )
    }
}