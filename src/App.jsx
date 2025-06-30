import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreDashboard from "./pages/Store/storeDashboard";
import MillDashboard from "./pages/Mill/millDashboard";
import LoginPage from "./pages/login";
import LandingPage from "./pages/landingPage";
import AdminHomePage from "./pages/Admin/adminHome";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<LandingPage />} />
          <Route path="/mill/*" element={<MillDashboard />} />
          <Route path="/store/*" element={<StoreDashboard />} />
          <Route path="/admin/*" element={<AdminHomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
