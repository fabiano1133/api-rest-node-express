import mongoose from "../config/mongoose.js";
import schema from "../schema/Users.js";

const userModel = mongoose.model("users", schema);

const UsersRepository = {
    list(q, page = 1) {
        const query = {};
        const LIMIT = 5;
        const skip = (page - 1) * LIMIT;
        return userModel.find(query, {}, { skip, limit: LIMIT });
    },

    create(data) {
        const user = new userModel(data);
        return user.save();
    },

    listById(id) {
        return userModel.findById(id);
    },

    listByEmail(email) {
        return userModel.findOne({ email });
    },
    updateById(id, data) {
        return userModel.updateOne({ _id: id }, data);
    },
    async findById(id) {
        const user = userModel.findById(id);

        return user;
    },

    deleteById(id) {
        return userModel.deleteOne({ _id: id });
    },
};

export default UsersRepository;
