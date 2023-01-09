import Users from "../model/user";

export async function getUsers(req,res) {
     try {
        const users = await Users.find({});

        if(!users) return res.status(404).json({ error: "Not Found."});
        res.status(200).json({users});
     } catch (error) {
        res.status(404).json({error : "Error ..."});
     }
}

export async function postUser(req,res) {
    try {
        const formData = req.body;
        console.log(formData);
        if(!formData) return res.status(404).json({ error: "not data provided"});
        Users.create(formData, function(err, data) {
            return res.status(200).json(data);
        });

    } catch (error) {
        return res.status(404).json({error});
    }
}