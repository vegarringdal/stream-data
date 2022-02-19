export async function fetchData() {
    /**
     * helper for logging
     * @param msg
     */
    function log(...msg: any[]) {
        console.log(msg);
    }

    const response = await fetch("/api/dummydata");

    if (response.status === 200) {
        const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
        if (reader) {
            while (true) {
                const { value, done } = await reader.read();
                if (value) {
                    log("fetching", value);
                }
                if (done) {
                    break;
                }
            }
            log("fetch done");
        } else {
            log("fetch error:", "body empty");
        }
    } else {
        log("fetch error:", response.status, response.statusText);
    }
}
