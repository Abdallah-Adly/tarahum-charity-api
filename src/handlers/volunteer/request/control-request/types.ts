import { Types } from "mongoose";

export type IParamsAssignVolunteerToRequest = {
    requestId: string;
};

export type IResponseAssignVolunteerToRequest = {
    _id: Types.ObjectId;
};