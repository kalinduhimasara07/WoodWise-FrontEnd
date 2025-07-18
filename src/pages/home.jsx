import ImageSlider from "../components/Home/imageSlider";
import FurnitureSlider from "../components/Home/productSlider";
import VideoComponent from "../components/Home/video";
import WoodenFurnitureFeatures from "../components/Home/wodenFurnitureFeatures";

export default function Home() {
  return (
    <div>
      <ImageSlider />
      <FurnitureSlider />
      <WoodenFurnitureFeatures />
      <VideoComponent />
    </div>
  );
}
