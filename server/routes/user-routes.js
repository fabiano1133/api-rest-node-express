import { Router } from "express";
import Users from "../controller/Users.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";

const userRoutes = Router();

userRoutes.post("/", Users.create);

userRoutes.post("/login", Users.login);

userRoutes.use(verifyJwt);

userRoutes.get("/", Users.list);

userRoutes.get("/:id", Users.listById);

userRoutes.put("/:id", Users.update);

userRoutes.delete("/:id", Users.delete);

export default userRoutes;
