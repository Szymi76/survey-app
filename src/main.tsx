import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

import App from "./App";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import "./styles/index.css";
import "./styles/elements.css";
import "./styles/content.css";
import "./styles/home.css";
import "./styles/creator.css";
import "./styles/survey.css";

import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <HashRouter>
      <AuthProvider>
        <Nav />
        <App />
        <Footer />
      </AuthProvider>
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
