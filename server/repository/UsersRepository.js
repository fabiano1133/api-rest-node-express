import { ObjectID } from "mongoist";
import database from "../config/mongoist.js";

const Users = {
    list(q, page = 1) {
        const query = {};
        if (q) query.name = new RegExp(q, "i");
        const DEFAULT_LIMIT = 5;
        const skip = Math.abs(page - 1) * DEFAULT_LIMIT;
        const responseDatabase = database.users.find(
            query,
            {},
            { skip, limit: DEFAULT_LIMIT }
        );

        return responseDatabase;
    },

    create(name, email, password) {
        const user = database.users.insert({
            name,
            email,
            password,
        });
        return user;
    },

    listById(id) {
        return database.users.findOne(ObjectID(id));
    },

    listByEmail(email) {
        return database.users.findOne({ email });
    },
    updateById(id, name, email, password) {
        return database.users.update(
            { _id: ObjectID(id) },
            {
                $set: {
                    name,
                    email,
                    password,
                },
            }
        );
    },
    async findById(id) {
        const user = await database.users.findOne({ _id: ObjectID(id) });

        return user;
    },

    deleteById(id) {
        return database.users.remove({ _id: ObjectID(id) });
    },
};

export default Users;
