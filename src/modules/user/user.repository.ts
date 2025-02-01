import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/common/base.repository";
import { IUser } from "src/models/user";


export class UserRepository extends BaseRepository<IUser> {
    constructor(
        @InjectModel('Users')
        private readonly userModel: Model<IUser>) {
        super(userModel);
    }
}
