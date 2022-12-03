import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SurveyPage from "./Survey";
import Creator from "./Creator";
import Settings from "./Settings";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import PageNotFound from "./components/PageNotFound";
import Stats from "./Stats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kreator" element={<Creator />} />
      <Route path="/ankieta/:id" element={<SurveyPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ustawienia" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/statystyki/:id" element={<Stats />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
