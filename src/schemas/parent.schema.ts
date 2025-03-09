import mongoose, { Schema } from "mongoose";
import { RelationShipType } from "src/models/parent";


export const ParentSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    job: { 
        type: String, 
        required: false 
    },
    children: { 
        type: Schema.Types.ObjectId, 
        ref: 'Students', 
        required: true 
    },
    relation_ship_type: { 
        type: String, 
        enum: Object.values(RelationShipType), 
        required: true 
    },
    is_primary_guardian: { 
        type: Boolean, 
        required: true 
    }
});
