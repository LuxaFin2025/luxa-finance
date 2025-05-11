import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Use vite-plugin-pwa auto registration
import { registerSW } from 'virtual:pwa-register';

registerSW(); // 🌟 Auto Service Worker Registration

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
