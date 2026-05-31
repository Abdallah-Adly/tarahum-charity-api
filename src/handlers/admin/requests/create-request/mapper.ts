import { IRequest } from "../../../../models/request.model"
import { IUser } from "../../../../models/user.model"


export const mapUser = (user: IUser) => {
    return {
        name: user.name,
        gender: user.gender,
        phone: user.phone,
        address: user.address
    }
}
export const map = (request: IRequest, user: IUser) => {
    return {
        totalMoney: request.totalMoney,
        date: request.date.toISOString(),
        status: request.status,
        user: mapUser(user)
    }
}