import express from "express";
import router from "../routes/index.js";

const app = express();

const logRequest = (req, res, next) => {
  console.log(`${req.url} - ${req.method} - ${new Date()}`);
  next();
};

const notFound = (req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
};

const error = (err, req, res, next) => {
  if (err.status !== 404) {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const notFavicon = (req, res, next) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end("");
  }
  next();
};

const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(logRequest);
app.use(error);
app.use(notFavicon);

// Routes
app.use(router);

// cors
app.use(cors);

app.use(notFound);

app.listen(3333, () => console.log("Server is running on port 3333"));
