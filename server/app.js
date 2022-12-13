import express from "express";
import cors from "cors";
import LogRequest from "../server/middlewares/LogRequest.js";
import NotFound from "../server/middlewares/NotFound.js";
import Error from "../server/middlewares/Error.js";
import NotFavicon from "../server/middlewares/NotFavicon.js";
import routes from "../server/routes/index.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(LogRequest.logRequest);

// Routes
app.use(routes);

// Middlewares of error
app.use(Error.handleError);
app.use(NotFavicon.notFavicon);
app.use(NotFound.notFound);

export default app;
