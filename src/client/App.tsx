import React from 'react';
import './App.css';
import {EditForm} from "./editor/edit-form";

function App() {
    return (
        <div className="App">
            <body>
            <div className={"container"}>
                <div className={"editingSpaceDiv"}>
                    <EditForm/>
                </div>
            </div>

            </body>

        </div>
    );
}

export default App;
