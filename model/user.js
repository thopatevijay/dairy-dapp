import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,
    role: String
})

const Users = models.user || model('user', userSchema)

export default Users;