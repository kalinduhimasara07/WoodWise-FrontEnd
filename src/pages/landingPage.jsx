import { div } from "framer-motion/client";
import ImageSlider from "../components/Home/imageSlider";
import FurnitureSlider from "../components/Home/productSlider";
import VideoComponent from "../components/Home/video";
import WoodenFurnitureFeatures from "../components/Home/wodenFurnitureFeatures";
import Header from "../components/Home/header";
import Footer from "../components/Home/footer";
import { Route, Routes } from "react-router-dom";
import FurnitureShowcase from "./furnitureShowcase";
import Home from "./home";
import ProductOverview from "./productOverViewPage";
import CategoryPage from "./categoryPage";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
import NotFoundPage from "../components/notFoundPage";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/furniture" element={<FurnitureShowcase />} />
        <Route path="/furniture/:id" element={<ProductOverview />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
