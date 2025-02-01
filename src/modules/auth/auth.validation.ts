import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { IdentityRepository } from "../identity/IdentityRepository";

@Injectable()
export class AuthValidation {
    constructor(
        private readonly userService: UserService,
    ){}

    async isExistsIdentity(email : string){
        const [user] = await this.userService.getAll({filter:{email}});
        if(user) throw new BadRequestException('Identity already exist.')
    }
}