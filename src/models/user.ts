import { Document } from "mongoose";
import { IAddress } from "./address";

export interface IUser extends Document {
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone_number : string;
    birth_date : Date;
    created_at : Date;
    updated_at : Date;
    address: string[] | IAddress[];
    image: string;
}

