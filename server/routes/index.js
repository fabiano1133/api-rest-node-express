import { Router } from "express";
import Home from "../controller/Home.js";
import userRoutes from "./user-routes.js";
import passport from "passport";
import { BasicStrategy } from "passport-http";

const routes = Router();

routes.use(passport.initialize());

passport.use(
    new BasicStrategy((username, password, done) => {
        if (username === "admin" && password === "admin") {
            return done(null, true);
        }
        return done(null, false);
    })
);

routes.get("/", Home.index);

routes.use("/users", userRoutes);

export default routes;
