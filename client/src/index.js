import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NavigationProvider } from "./context/navigation";
import store from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { loginOk } from "./slices/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

async function start() {
  const sessionToken = localStorage.getItem("sessionToken");
  if (sessionToken) {
    store.dispatch(loginOk({ sessionToken }));
  }

  root.render(
    <NavigationProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </NavigationProvider>
  );
}

start();
