import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "../../common/base.repository";
import { IAddress } from "src/models/address";

export class AddressRepository extends BaseRepository<IAddress> {
    constructor(
        @InjectModel("Address")
        private readonly addressModel: Model<IAddress>
    ) {
        super(addressModel);
    }
}