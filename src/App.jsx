import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import StoreDashboard from "./pages/Store/storeDashboard";
import MillDashboard from "./pages/Mill/millDashboard";
import LoginPage from "./pages/login";
import HomePage from "./pages/homePage";
import AddFurniture from "./pages/Admin/addFurniture";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/mill/*" element={<MillDashboard />} />
          <Route path="/store/*" element={<StoreDashboard />} />
          <Route path="/admin/add-furniture" element={<AddFurniture />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
