export type IResponseGetRequests = {
    _id: string;
    totalMoney: number;
    date: string;
    status: string;
    beneficiary: {
        _id: string;
        name: string;
        gender: string;
        phone: string;
        address: string;
    };
}[];

export type IQueryStatus = { status: string };