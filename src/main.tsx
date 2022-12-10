import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import "./styles/index.css";
import "./styles/elements.css";
import "./styles/content.css";
import "./styles/home.css";
import "./styles/creator.css";
import "./styles/survey.css";
import "./styles/auth.css";
import "./styles/settings.css";
import "./styles/dashboard.css";
import "./styles/stats.css";

import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Nav />
        <App />
        <Footer />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
