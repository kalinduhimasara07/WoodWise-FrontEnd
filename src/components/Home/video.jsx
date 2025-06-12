import React from 'react';

const VideoComponent = () => {
  return (
    <div className="relative  flex justify-center items-center ">
      <video
        className="w-full h-[600px] object-cover"
        width="640"
        height="360"
        muted 
        autoPlay
        loop
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute text-white font-bold text-[75px] left-10 bottom-10">
        Furniture Made to Move You
      </div>
    </div>
  );
};

export default VideoComponent;

