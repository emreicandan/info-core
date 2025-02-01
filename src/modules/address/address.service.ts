import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./address.repository";
import { IAddress } from "src/models/address";
import { BaseService } from "src/common/base.service";




@Injectable()
export class AddressService extends BaseService<IAddress> {
    constructor(
        private readonly addressRepository: AddressRepository
    ) {
        super(addressRepository)
    }

}