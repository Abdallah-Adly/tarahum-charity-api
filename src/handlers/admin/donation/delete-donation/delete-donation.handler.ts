import { ApiHandler } from "../../../../interfaces/ApiHandler";
import { Donation } from "../../../../models/donation.model";
import { IDeleteDonationParam } from "./types";


export const deleteDonation: ApiHandler<{}, {}, IDeleteDonationParam> = async (req, res) => {

    const { donationId } = req.params;

    const donation = await Donation.findByIdAndDelete(donationId);

    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({ message: "Donation deleted successfully", });
};
