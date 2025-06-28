import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import StoreDashboard from "./pages/Store/storeDashboard";
import MillDashboard from "./pages/Mill/millDashboard";
import LoginPage from "./pages/login";
import AddFurniture from "./pages/Admin/addFurniture";
import AddUser from "./pages/Admin/addUser";
import LandingPage from "./pages/landingPage";
import ProductOverview from "./pages/productOverViewPage";
import AdminHomePage from "./pages/Admin/adminHome";
import { Toaster } from "react-hot-toast";
import FurnitureShowcase from "./pages/furnitureShowcase";
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
          {/* <Route path="/admin/add-furniture" element={<AddFurniture />} /> */}
          {/* <Route path="/admin/add-user" element={<AddUser />} /> */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/furniture/:id" element={<ProductOverview />} /> */}
          {/* <Route path="/furniture" element={<FurnitureShowcase />} /> */}
          {/* <Route
            path="/category"
            element={
              <div className="flex items-center justify-center text-4xl">
                Category Page
              </div>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
