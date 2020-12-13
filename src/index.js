import React, {useState} from "react";
import ReactDOM from 'react-dom';

function App() {
    const [state, setState] = useState("CLICK ME");

    return (
        <React.Frament>
            <h1>React with Internet Explorer</h1>
            <button onClick={() => setState("CLICKED")}>{state}</button>
        </React.Frament>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);