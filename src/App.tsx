import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SurveyPage from "./Survey";
import Creator from "./Creator";
// import Auth from "./components/Auth";
import Auth from "./Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ankieta/:id" element={<SurveyPage />} />
      <Route path="/kreator" element={<Creator />} />
      <Route path="/auth" element={<Auth />} />

      <Route path="*" element={<h1>404 | Nie znaleziono</h1>} />
    </Routes>
  );
}

export default App;
