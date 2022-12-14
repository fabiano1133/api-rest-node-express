import debug from "debug";
import mongoose from "mongoose";
import config from "config";

const log = debug("app:mongoose");

mongoose.connect(config.get("mongo.url"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => log("mongodbError", err));

export default mongoose;
