import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Creator from "./pages/Creator";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kreator" element={<Creator />} />
      <Route path="/ankieta/:id" element={<Survey />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ustawienia" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/statystyki/:id" element={<Stats />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
