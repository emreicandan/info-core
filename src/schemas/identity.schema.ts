import mongoose , {Schema} from "mongoose";

export const IdentitySchema = new mongoose.Schema({
    identifier : {type : String , required : true},
    password : {type : String , required : true},
    role : {type : String , reqired : true},
    user : {type : Schema.Types.ObjectId , ref : "Users" , required : false},
},
{versionKey : false});