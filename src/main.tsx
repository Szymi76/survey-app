import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import "./styles/index.css";
import "./styles/elements.css";
import "./styles/content.css";
import "./styles/home.css";
import "./styles/creator.css";
import "./styles/survey.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
