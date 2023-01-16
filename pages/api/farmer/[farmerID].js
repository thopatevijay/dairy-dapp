import { getFarmer } from "../../../database/farmerController";

export default function handler(req, res) {

    const { method } = req;
    switch (method) {
        case 'GET':
            getFarmer(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}
