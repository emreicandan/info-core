import { Document } from "mongoose";
import { IStudent } from "./student";
import { IUser } from "./user";

export enum RelationShipType {
    Mother = "mother",
    Father = "father",
    Brother = "brother",
    Sister = "sister",
    GrandMother = "grand_mother",
    GrandFather = "grand_father",
    Guardian = "guardian",
    Uncle = "uncle",
    Aunt = "aunt"
}

export interface IParent extends Document {
    user: IUser,
    job: string,
    children: IStudent,
    relation_ship_type: RelationShipType,
    is_primary_guardian: boolean
}