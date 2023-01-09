import Users from "../model/user";

export async function getUsers(req, res) {
    try {
        const users = await Users.find({});

        if (!users) return res.status(404).json({ error: "Not Found." });
        res.status(200).json({ users });
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}

export async function postUser(req, res) {
    try {
        const formData = req.body;
        if (!formData) return res.status(404).json({ error: "not data provided" });
        Users.create(formData, function (err, data) {
            return res.status(200).json(data);
        });

    } catch (error) {
        return res.status(404).json({ error });
    }
}

export async function getUserByEmail(req, res) {
    try {
        const { email, password } = req.body;

        const users = await Users.findOne({ email });
        if (users && password === users.password) {
            console.log('Loged In');
            res.status(200).json({ users });
          } else {
            console.log('Not Loged In');
            return res.status(404).json({ error: "Not Loged In" });
          }
        if (!users) return res.status(404).json({ error: "Not Found." });
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}