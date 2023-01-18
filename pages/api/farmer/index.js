import { addFarmer } from "../../../database/farmerController";

export default function handler(req, res) {

    const { method } = req;
    switch (method) {
        case 'POST':
            addFarmer(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}
