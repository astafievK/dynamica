import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Providers} from "./Providers.tsx";

ReactDOM.createRoot(document.getElementById("dynamica")!).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
);
