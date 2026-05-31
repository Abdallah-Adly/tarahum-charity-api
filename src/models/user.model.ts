import mongoose, { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  role: Role;
  gender: Gender;
  avatar?: string;
  isEmailVerified: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

export enum Role {
  Admin = "admin",
  Donor = "donor",
  Beneficiary = "beneficiary",
  Volunteer = "volunteer",
};

export enum Gender {
  Male = "male",
  Female = "female",
};
const userSChema = new mongoose.Schema<IUser>({
  //_id:Types.ObjectId,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [Role.Donor, Role.Beneficiary, Role.Volunteer, Role.Admin, Role.Volunteer],
    default: Role.Admin,
    required: true
  },
  phone: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    enum: [Gender.Male, Gender.Female],
    // required: true
  },
  avatar: {
    type: String
  },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  isEmailVerified: { type: Boolean, default: false }
});
export const User = mongoose.model<IUser>("User", userSChema);









