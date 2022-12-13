import { Router } from "express";
import Users from "../controller/Users.js";

const userRoutes = Router();

userRoutes.get("/", Users.list);

userRoutes.get("/:id", Users.listById);

userRoutes.post("/", Users.create);

userRoutes.put("/:id", Users.update);

userRoutes.delete("/:id", Users.delete);

export default userRoutes;
