import { div } from "framer-motion/client";
import ImageSlider from "../components/Home/imageSlider";
import FurnitureSlider from "../components/Home/productSlider";
import VideoComponent from "../components/Home/video";

export default function LandingPage() {
  return (
    <div>
      <ImageSlider />
      <FurnitureSlider />
      <VideoComponent />
    </div>
  );
}
