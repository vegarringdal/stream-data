import React, { useState } from "react";
import "./App.css";
import { fetchData } from "./fetchData";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col text-center  bg-gray-800 flex-grow text-white h-full">
            <header className="App-headerflex text-lg flex-col justify-center align-middle ">
                Stream data
            </header>
            <div className="flex flex-col flex-1">
                <button
                    className="m-auto p-2 w-28 bg-gray-600"
                    onClick={() => {
                        let count = 0;
                        setCount(0);
                        fetchData((event, data) => {
                            switch (event) {
                                case "data":
                                    count++;
                                    console.log("data rows recived:", data?.name);
                                    setCount(count);
                                    break;
                                case "done":
                                    console.log("done", count);
                                    break;
                                case "error":
                                    console.log("error", data, count);
                                    break;
                            }
                        });
                    }}
                >
                    Get Data
                </button>
                <span className="flex-1">rows recived:{count}</span>
            </div>
        </div>
    );
}

export default App;
