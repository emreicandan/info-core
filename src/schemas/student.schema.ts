import mongoose,{Schema} from "mongoose";

export const StudentSchema = new mongoose.Schema({
    user : {type : Schema.Types.ObjectId, ref:"Users",required:true , index:true},
    school : {type : String, required:true},
    parent : {type : Schema.Types.ObjectId , ref:"Parents",required:false}
});