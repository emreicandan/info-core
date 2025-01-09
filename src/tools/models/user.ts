import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string,
    name: string,
    surname: string,
    email: string,
    image: string
}

