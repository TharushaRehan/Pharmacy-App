import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDns_pgz3FUtNsqAC9C02aXqbQUPLnoCwI",
  authDomain: "pharmacy-app-8600c.firebaseapp.com",
  databaseURL: "https://pharmacy-app-8600c-default-rtdb.firebaseio.com",
  projectId: "pharmacy-app-8600c",
  storageBucket: "pharmacy-app-8600c.appspot.com",
  messagingSenderId: "472006740001",
  appId: "1:472006740001:web:24d4e803ab1688477d7b60",
  measurementId: "G-CKXE7SEC2S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
