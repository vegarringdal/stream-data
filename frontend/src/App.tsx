import React from "react";
import "./App.css";
import { fetchData } from "./fetchData";

function App() {
    return (
        <div className="flex flex-col text-center  bg-gray-800 flex-grow text-white h-full">
            <header className="App-headerflex text-lg flex-col justify-center align-middle ">
                Stream data
            </header>
            <div className="flex-1">
                <button
                    className="p-2 w-28 m-2 bg-gray-600"
                    onClick={() => {
                        let count = 0;
                        fetchData((event, data) => {
                            switch (event) {
                                case "data":
                                    count++;
                                    console.log("data rows recived:", data?.name);
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
            </div>
        </div>
    );
}

export default App;
