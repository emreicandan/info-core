import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/common/base.repository";
import { IIdentity } from "src/models/identity";
import { IUser } from "src/models/user";

export class IdentityRepository extends BaseRepository<IIdentity> {
    constructor(
        @InjectModel("Identity")
        private readonly identityModel: Model<IIdentity>
    ) {
        super(identityModel);
    }
}