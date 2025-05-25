import React from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import { store } from "./store";
import MainPage from "./MainPage.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainPage />
      <App />
    </Provider>
  </React.StrictMode>
);
