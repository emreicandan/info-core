import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/common/base.repository";
import { IParent } from "src/models/parent";

@Injectable()
export class ParentRepository extends BaseRepository<IParent> {
    constructor(
        @InjectModel('Parents')
        private readonly parentModel: Model<IParent>) {
        super(parentModel);
    }
}