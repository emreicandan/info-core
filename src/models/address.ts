import { Document } from "mongoose";
import { IUser } from "./user";

export enum AddressType {
    Home = "Home",
    Work = "Work",
    School = "School",
    Other = "Other"
}

export interface IAddress extends Document {
    _id : string,
    country : string,
    city : string,
    district : string,
    address_line : string,
    type : AddressType,
    user : string | IUser,
    created_at : Date
}