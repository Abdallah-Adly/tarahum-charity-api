import { RequestStatus } from "../../../../models/request.model";

export type IParamsGetBeneficiaryRequestId = {
    requestId: string;
};

export type IResponseGetBeneficiaryRequestId = {
    _id: string;
    totalMoney: number;
    date: string;
    status: RequestStatus;
};