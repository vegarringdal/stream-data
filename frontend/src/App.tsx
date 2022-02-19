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
                <button className="p-2 w-28 m-2 bg-gray-600" onClick={() => fetchData()}>
                    Get Data
                </button>
            </div>
        </div>
    );
}

export default App;
