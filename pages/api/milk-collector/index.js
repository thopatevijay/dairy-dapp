import { collectMilk, getAllCollctedMilk } from "../../../database/milk-collector.controller";

export default function handler(req, res) {

    const { method } = req;

    switch (method) {
        case 'GET':
            getAllCollctedMilk(req, res);
            break;
        case 'POST':
            collectMilk(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}
