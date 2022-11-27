import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SurveyPage from "./components/Survey";
// import Creator from "./components/Creator";
import useAuth from "./hooks/useAuth";
import Creator from "./Creator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ankieta/:id" element={<SurveyPage />} />
      <Route path="/kreator" element={<Creator />} />

      <Route path="*" element={<h1>404 | Nie znaleziono</h1>} />
    </Routes>
  );
}

export default App;
