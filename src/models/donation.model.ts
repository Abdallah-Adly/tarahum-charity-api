import mongoose, { Schema, Types } from "mongoose";
import { Role, User } from "./user.model";


// type donationStatus = "submitted" | "confirmed" | "fulfilled";


// GET /api/volunteer/requests
// GET /api/volunteer/requests/:requestId
// POST /api/volunteer/requests/:requestId

interface IDonation {
    donor: Types.ObjectId;
    request: Types.ObjectId
    money?: number;
    item?: string;
    status: donationStatus;
    date: Date
}
export enum donationStatus {
    Submitted = "submitted",
    Confirmed = "confirmed",
    Filled = "filled",
}

const donationSchema = new mongoose.Schema<IDonation>({
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async function (donorId: Types.ObjectId) {

                const user = await User.findById(donorId).select("role");

                console.log(user);

                if (user?.role !== Role.Donor)
                    return false;
                return true;
            },
            message: "You must be a donor to make a donation"
        }
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: "Request",
        required: true,
    },
    money: {
        type: Number,
        required: function () {
            return !this.item;
        },
    },
    item: {
        type: String,
        required: function () {
            return !this.money;
        },
        validate: {
            validator: function (item: string) {
                if (this.money)
                    return false;
                return true;
            },
            message: 'You cannot enter item if money is provided'
        }

    },
    status: {
        type: String,
        enum: [donationStatus.Submitted, donationStatus.Confirmed, donationStatus.Filled],
        default: donationStatus.Submitted,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});


export const Donation = mongoose.model<IDonation>("Donation", donationSchema);









