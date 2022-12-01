import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SurveyPage from "./Survey";
import Creator from "./Creator";
import Settings from "./Settings";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kreator" element={<Creator />} />
      <Route path="/ankieta/:id" element={<SurveyPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ustawienia" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<h1>404 | Nie znaleziono</h1>} />
    </Routes>
  );
}

export default App;
