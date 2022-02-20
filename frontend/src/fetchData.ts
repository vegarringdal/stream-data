type event = "error" | "done" | "data";
export async function fetchData(callback: (type: event, data: any) => void) {
    const response = await fetch("/api/dummydata");

    if (response.status === 200) {
        const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
        if (reader) {
            // this will hold leftover data between every read
            let cache = "";

            let firstCall = true;

            while (true) {
                const { value, done } = await reader.read();

                // if we have any in cache, then we need to add it before new value
                let text = cache + (value || ""); // if value is undefined, just use ""
                cache = "";

                if (firstCall) {
                    text = text.substring(1, text.length);
                    firstCall = false;
                }

                // length we need to loop
                const length = text.length;

                // check if we have text, and it starts with open bracket
                if (text && text.length) {
                    // set open bracket to buffer
                    let buffer = "";
                    // since we skip first bracket we set group to 1
                    let group = 0;

                    // loop all and skip first letter
                    for (let i = 0; i < length; i++) {
                        // add letter to our buffer
                        buffer = buffer + text[i];

                        // if open bracket, then its a new group
                        if (text[i] === "{") {
                            group++;
                        }

                        // if close, then group is done
                        if (text[i] === "}") {
                            group--;
                        }

                        // if close bracket, and group is 0, then we are in the end of our array, send back data to caller
                        if (text[i] === "}" && group === 0) {
                            if (buffer[0] === ",") {
                                buffer = buffer.substring(1, buffer.length);
                            }

                            callback("data", JSON.parse(buffer));
                            buffer = "";
                        }

                        // last row, if anything in buffer then we need to keep it
                        if (buffer && length - 1 === i) {
                            cache = buffer;
                            buffer = "";
                        }
                    }

                    // if done and we only have bracket of "array" left then we are in the end..

                    if (done && text === "]") {
                        break;
                        callback("done", null);
                    }
                    if (done && !value) {
                        callback(
                            "error",
                            "unexpected result, bad data from server?, unparsed data:" + text
                        );
                    }
                } else {
                    if (done) {
                        break;
                        callback("done", "fml");
                    } else {
                        if (text && text.length) {
                            callback("error", "unexpected result, expected [, but got" + text[0]);
                        }
                    }
                }
            }
        } else {
            callback("error", "body empty");
        }
    } else {
        callback("error", ["fetch error", response.status, response.statusText]);
    }
}
