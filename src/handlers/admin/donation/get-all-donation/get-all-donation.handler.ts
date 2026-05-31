import { Donation } from "../../../../models/donation.model";
import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { IGetAllDonationsResponse, IGetAllDonationsQuery } from "./types";
import { validationResult } from "express-validator";



export const getAllDonations: ApiHandler<{}, IGetAllDonationsResponse, {}, IGetAllDonationsQuery> = async (req, res) => {
  try {


    const { status } = req.query;
    let donations: IGetAllDonationsResponse = [];
    if (status) {
      donations = await Donation.find({ status })
        .populate("donor", "name email phone")
        .populate("request", "status")
        .select("_id money item status date");
    } else {
      donations = await Donation.find()
        .populate("donor", "name email phone")
        .populate("request", "status")
        .select("_id money item status date");
    }
    res.json({ data: donations });
  } catch (err) {
    res.status(500).json({ message: "Error fetching donations" });
  }
};