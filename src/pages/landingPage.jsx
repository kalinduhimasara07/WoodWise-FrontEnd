import { div } from "framer-motion/client";
import ImageSlider from "../components/Home/imageSlider";
import FurnitureSlider from "../components/Home/productSlider";

export default function LandingPage() {
  return (
    <div>
      <ImageSlider />
      <FurnitureSlider />
    </div>
  );
}
