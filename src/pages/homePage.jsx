import { Route, Router, Routes } from "react-router-dom";
import Header from "../components/Home/header";
import ImageSlider from "../components/Home/imageSlider";
import LandingPage from "./landingPage";
import Footer from "../components/Home/footer";

export default function HomePage() {
  return (
    <div className="h-screen">
      <Header />
      <Routes path="/*">
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/furniture"
          element={
            <div className="flex items-center justify-center text-4xl">
              Furniture Page
            </div>
          }
        />
        <Route
          path="/category"
          element={
            <div className="flex items-center justify-center text-4xl">
              Category Page
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
