import { Document } from "mongoose";
import { IParent } from "./parent";
import { IUser } from "./user";

export interface IStudent extends Document{
    user : IUser,
    school : string,
    parent : IParent
};