import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import StoreDashboard from "./pages/Store/storeDashboard";
import MillDashboard from "./pages/Mill/millDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/mill/*" element={<MillDashboard />} />
          <Route path="/store/*" element={<StoreDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
