import { app } from "./initDefaultHttp";
import { SERVER_API_ROOT } from "./config";
import { DummyDataConnection } from "./DummyDataConnection";

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

        const connection = new DummyDataConnection(99, 10);
        connection.query((type, data) => {
            // if any data, then we send it
            if (data.length) {
                res.write(JSON.stringify(data));
            }

            if (type === "close") {
                res.end();
                next();
            }
        });

        // todo:
        // add dummy data array 50k
        // send get batches of 200 rows and send to client
    });
}
