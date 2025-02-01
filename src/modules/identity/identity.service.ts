import { Injectable } from "@nestjs/common";
import { IIdentity } from "src/models/identity";
import { IdentityRepository } from "./IdentityRepository";
import { BaseService } from "src/common/base.service";



@Injectable()
export class IdentityService extends BaseService<IIdentity> {
    constructor(private readonly identityRepository: IdentityRepository) {
        super(identityRepository)
     }
}
