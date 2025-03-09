import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/base.service";
import { IParent } from "src/models/parent";
import { ParentRepository } from "./parent.repository";

@Injectable()
export class ParentService extends BaseService<IParent> {
    constructor(
        private readonly parentRepository: ParentRepository
    ) {
        super(parentRepository)
    }
}