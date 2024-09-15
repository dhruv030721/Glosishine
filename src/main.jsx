import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./Slice/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          toastOptions={{
            style: { fontSize: "14px", fontFamily: "Caveat cursive" },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
