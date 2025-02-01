import { Document } from "mongoose";
import { IUser } from "./user";

export interface IIdentity extends Document {
    _id : string;
    identifier : string;
    password : string;
    role : string;
    user?: string | IUser;
}