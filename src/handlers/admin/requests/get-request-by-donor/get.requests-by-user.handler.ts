import { Request } from "../../../../models/request.model";
import { IUser } from "../../../../models/user.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IResponseRequestByDonor, IParamsRequestByDonor } from "./types";


export const getRequestsByUserHandler: ApiHandler<{}, IResponseRequestByDonor, IParamsRequestByDonor>
    = async (req, res) => {

        const { userId } = req.params;

        const requests = await Request.find({ donor: userId })
            .populate<{ donor: IUser }>("donor", "name gender phone address")
            .populate<{ volunteer: IUser }>("volunteer", "name email phone")
            .select("_id totalMoney date status");

        if (requests.length == 0) {
            return res.status(404).json({ message: "This user has no requests!" });
        }

        const response: IResponseRequestByDonor = requests.map(req => ({
            _id: req._id,
            totalMoney: req.totalMoney,
            date: req.date.toISOString(),
            status: req.status,
            donor: {
                _id: req.donor._id,
                name: req.donor.name,
                gender: req.donor.gender,
                phone: req.donor.phone,
                address: req.donor.address,
            },
            volunteer:{
                _id: req.volunteer._id,
                name: req.volunteer.name,
                email: req.volunteer.email,
                phone: req.volunteer.phone,
            }
        }))
        res.status(200).json({data: response});

    };