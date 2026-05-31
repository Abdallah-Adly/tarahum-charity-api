import { RequestStatus } from "../../../../models/request.model";

export type IParamsGetDonorRequest = {
    requestId: string;
};

export type IResponseGetDonorRequestById = {
    _id: string;
    totalMoney: number;
    date: string;
    status: RequestStatus;
    beneficiary: {
        name: string;
        gender: string;
        phone: string;
        address: string;
    };
};