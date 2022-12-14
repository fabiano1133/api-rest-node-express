import UsersRepository from "../repository/UsersRepository.js";
import createError from "http-errors";

const handleNotFound = (result) => {
    if (!result) {
        return createError(404, "User Not Found!");
    }
    return result;
};

const handleEmailExists = (email) => {
    if (email) {
        return createError(500, "Email already exists!");
    }
    return email;
};

const Users = {
    list(req, res, next) {
        const { q, page } = req.query;
        UsersRepository.list(q, page)
            .then((users) =>
                res.json({
                    users: users,
                    page: page,
                    count: users.length,
                    nextPage: Boolean(users.length > 0),
                })
            )
            .catch(next);
    },

    async listById(req, res, next) {
        const { id } = req.params;

        try {
            const user = await UsersRepository.listById(id).then(
                handleNotFound
            );
            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        const { name, email, password } = req.body;

        try {
            const emailExists = await UsersRepository.listByEmail(email);

            if (emailExists) {
                return next(handleEmailExists(email));
            }
            await UsersRepository.create({
                name,
                email,
                password,
            });

            return res.status(201).json({ message: "User created!" });
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const user = await UsersRepository.findById({ _id: id });

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            await UsersRepository.updateById(id, {
                name,
                email,
                password,
            });
            return res.json({ message: "User updated!" });
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const user = await UsersRepository.findById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            await UsersRepository.deleteById(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};
export default Users;
