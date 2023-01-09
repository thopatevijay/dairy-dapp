import connectMongo from "../../../database/connection";
import { getUsers, postUser, getUserByEmail } from "../../../database/controller";

export default function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection" }));

    const { method } = req;

    switch (method) {
        case 'GET':
            getUsers(req, res);
            break;
        case 'POST':
            // postUser(req,res);
            getUserByEmail(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
}
