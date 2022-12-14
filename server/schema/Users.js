import mongoose from "../config/mongoose.js";
const { Schema } = mongoose;

const Users = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default Users;
