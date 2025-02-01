import { Controller } from "@nestjs/common";
import { AddressService } from "./address.service";
import { BaseController } from "src/common/base.controller";
import { IAddress } from "src/models/address";

@Controller('address')
export class AddressController extends BaseController<IAddress> {
    constructor(private readonly addressService: AddressService) {
        super(addressService , "Address")
    }    
}
