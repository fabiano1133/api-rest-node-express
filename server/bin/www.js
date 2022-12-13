import app from "../app.js";
import debug from "debug";
import cluster from "cluster";
import os from "os";
import dnscache from "dnscache";
import http from "http";
import https from "https";
import config from "config";

const numCPUs = os.cpus();
const log = debug("api_restfull_nodejs_express:server");
const onWorkerError = (code, signal) => log(code, signal);

http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;

dnscache({
    enable: true,
    ttl: 300,
    cachesize: 1000,
});

if (cluster.isMaster) {
    numCPUs.forEach(() => {
        const worker = cluster.fork();
        worker.on("error", onWorkerError);
    });
    cluster.on("exit", (err) => {
        const newWorker = cluster.fork();
        newWorker.on("error", onWorkerError);
        log(`A new worker has been created ${newWorker.process.pid}`);
    });
    cluster.on("exit", (err) => log(err));
} else {
    const server = app.listen(config.get("server.port"), () =>
        log("Server is running on port 3333")
    );
    server.on("error", (err) => log(err));
}
