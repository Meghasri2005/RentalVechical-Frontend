
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppProvider } from "./Context/AppContext";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
        <AppProvider>
             <App />
        </AppProvider> 
    </BrowserRouter>
 
);

