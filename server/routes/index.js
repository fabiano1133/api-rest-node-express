import { Router } from "express";
import Home from "../controller/Home.js";
import userRoutes from "./user-routes.js";

const routes = Router();

routes.get("/", Home.index);

routes.use("/users", userRoutes);

export default routes;