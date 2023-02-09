import UsersRepository from "../repository/UsersRepository.js";
import createError from "http-errors";
import jwt from "jwt-simple";
import moment from "moment/moment.js";
import config from "config";
import { compare, hash } from "bcrypt";

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
                    users: users.map((user) => {
                        return {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        };
                    }),
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

            const hashedPassword = await hash(password, 10);

            await UsersRepository.create({
                name,
                email,
                password: hashedPassword,
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

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await UsersRepository.listByEmail(email);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Email or password incorrect" });
            }

            const isPasswordValid = await compare(password, user.password);

            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ message: "Email or password incorrect" });
            }

            const token = jwt.encode(
                {
                    _id: user._id,
                    email: email,
                    exp: moment().add(7, "days").valueOf(),
                },
                config.get("jwtTokenSecret")
            );

            return res.json({
                email: user.email,
                token: token,
            });
        } catch (error) {
            next(error);
        }
    },
};
export default Users;
