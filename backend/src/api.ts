import { app } from "./initDefaultHttp";
import { SERVER_API_ROOT } from "./config";

export function initApi() {
    const path = SERVER_API_ROOT + "/" + "dummydata";

    /**
     * simple logger helper
     * @param msg
     */
    function log(...msg) {
        console.log("LOGGER: ", msg);
    }

    app.get(path, (req, res, next) => {
        log("API method", req.method);
        log("API params", req.params);

        res.setHeader("Content-Type", "text/html");

        res.write(new Date().toISOString());
        res.end();
        // todo:
        // add dummy data array 50k
        // send get batches of 200 rows and send to client

        next();
    });
}
