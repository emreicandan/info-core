import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IdentityService } from "./identity.service";
import { IdentityController } from "./identity.controller";
import { IdentityRepository } from "./IdentityRepository";
import { IdentitySchema } from "src/schemas/identity.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Identity", schema: IdentitySchema }])],
  providers: [IdentityService , IdentityRepository],
  controllers: [IdentityController],
  exports: [IdentityService , IdentityRepository],
})
export class IdentityModule {}
