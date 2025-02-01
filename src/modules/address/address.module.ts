import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from 'src/schemas/address.schema';


@Module({
    controllers: [AddressController],
    providers: [AddressService , AddressRepository],
    exports: [AddressService],
    imports: [MongooseModule.forFeature([{ name: "Address", schema: AddressSchema }])],
})
export class AddressModule {

}
