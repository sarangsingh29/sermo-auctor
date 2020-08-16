import React from 'react';
import './App.css';
import {FileEditor} from "./file-editor";

function App() {
    return (
        <div className="App">
            <body>
            <div className={"container mt-5"}>
                <FileEditor/>
            </div>
            </body>

        </div>
    );
}

export default App;
