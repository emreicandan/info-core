import { model, Schema } from "mongoose";
import { AddressType, IAddress } from "src/models/address";


export const AddressSchema = new Schema<IAddress>({
    country: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    address_line: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(AddressType),
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    created_at: { type: Date, default: new Date }
}, { versionKey: false });

export const AddressModel = model<IAddress>("Address", AddressSchema);