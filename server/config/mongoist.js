import debug from "debug";
import mongoist from "mongoist";
import config from "config";

const log = debug("api_restfull_nodejs_express:config:mongoist");

const database = mongoist(config.get("mongo.url"));
database.on("error", (err) => log("mongo err", err));

export default database;
