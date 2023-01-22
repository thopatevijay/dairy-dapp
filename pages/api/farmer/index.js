import { addFarmer, getAllFarmers } from "../../../database/farmerController";

export default function handler(req, res) {

    const { method } = req;
    switch (method) {
        case 'GET':
            getAllFarmers(req, res);
            break;
        case 'POST':
            addFarmer(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}
