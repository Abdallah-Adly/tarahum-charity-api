import mongoose, { Schema, SchemaTypeOptions, Types } from "mongoose";


// type requestStatus = "pending" | "approved" | "completed";

export interface IRequest {
    _id: Types.ObjectId
    totalMoney: number;
    date: Date;
    status: RequestStatus;
    volunteer: Types.ObjectId;
    beneficiary: Types.ObjectId;
    donor: Types.ObjectId
}

export enum RequestStatus {
    Pending = "pending",
    Approved = "approved",
    Completed = "completed",
}
const requestSchema = new mongoose.Schema<IRequest>({
    // _id: Schema.Types.ObjectId,
    totalMoney: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        // required: true
        default: Date.now
    },
    status: {
        type: String,
        enum: [RequestStatus.Pending, RequestStatus.Approved, RequestStatus.Completed],
        default: RequestStatus.Pending,
        // required: true
    },
    volunteer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    beneficiary: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }
});



export const Request = mongoose.model<IRequest>("Request", requestSchema);







