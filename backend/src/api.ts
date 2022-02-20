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

        res.setHeader("Content-Type", "application/json");

        // make our dummy data connection, set how many rows, and response cache
        const connection = new DummyDataConnection(2345, 37);

        // call dummy connection with query and send data to client as we get it

        let firstCall = true;

        connection.query((type, data) => {
            // if any data, then we send it

            if (firstCall) {
                // need to open the query
                res.write("[");
                firstCall = false;
            }

            if (data.length) {
                // substring data, so we remove the brackets "[" "]"
                const text = JSON.stringify(data);
                log("sending records:", data?.length || 0);
                res.write(text.substring(1, text.length - 1));
            }

            if (type === "close") {
                res.write("]"); // need to close our array
                res.end();
                next();
            }
        });
    });
}
