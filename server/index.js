import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.js";
import surveyRouter from "./routes/survey.js";

// PORT I ŚCIEŻKI
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// KONFIGURACJA
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// ZBUDOWANA APLIKACJA REACT
app.use(express.static(path.join(__dirname, "..", "dist")));

// API ENDPOINTS
app.use("/api/auth", authRouter);
app.use("/api/survey", surveyRouter);

// PRZEKIEROWANIE DO STRONY GŁÓWNEJ GDY DANA ŚCIEŻKA NIE ISTNIEJE
app.get("*", (req, res) => {
  res.redirect("/");
});

// POŁĄCZENIE Z MONGODB
mongoose
  .connect(process.env.MONGO_DB_CONN)
  .then(() => {
    console.log("Polączono z bazą danych ✔️");
    app.listen(port, () => {
      console.log(`Serwer działa na porcie ${port} ✔️`);
    });
  })
  .catch(err => {
    console.log(`Błąd podczas połączenia z bazą danych ❌ ${err}`);
  });
