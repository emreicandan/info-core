import mongoose, { Schema } from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true , index: true},
    phone_number: { type: String, required: true },
    birth_date: { type: Date },
    created_at: { type: Date , default : Date.now },
    updated_at: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: false },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: false },
    image: { type: String, required: false }
}, { versionKey: false });