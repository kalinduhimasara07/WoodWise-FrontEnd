import { div } from "framer-motion/client";
import ImageSlider from "../components/Home/imageSlider";
import FurnitureSlider from "../components/Home/productSlider";
import VideoComponent from "../components/Home/video";
import WoodenFurnitureFeatures from "../components/Home/wodenFurnitureFeatures";
import Header from "../components/Home/header";
import Footer from "../components/Home/footer";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <ImageSlider />
      <FurnitureSlider />
      <WoodenFurnitureFeatures/>
      <VideoComponent />
      <Footer />
    </div>
  );
}
