import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {type:String,required : true},
    surname: {type:String,required : true},
    email: {type:String,required : true},
    image: {type:String,required : false}
}, { versionKey: false });