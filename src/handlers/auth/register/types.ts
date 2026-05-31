import { Gender, Role } from "../../../models/user.model";

export type IRequestRegister = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: Role;
    gender: Gender;
    avatar?: string
}