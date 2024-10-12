import React, { useRef, useEffect, useState } from "react";
import tvFrameSvg from "../../assets/TVFrame.png";

const TVVideoSection = ({ videoUrl, videoClassName }) => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [dimensions, setDimensions] = useState({ frame: {}, video: {} });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const calculateDimensions = (frameRect, screenWidth) => {
    let videoWidth, videoHeight, videoLeft, videoTop;

    if (screenWidth < 375) {
      // Mobile screens
      videoWidth = frameRect.width * 0.75 - 5;
      videoHeight = frameRect.height * 0.65 + 10;
      videoLeft = frameRect.width * 0.125 - 30;
      videoTop = frameRect.height * 0.17 - 20;
    } else if (screenWidth < 400) {
      // Mobile screens
      videoWidth = frameRect.width * 0.75 - 5;
      videoHeight = frameRect.height * 0.65 + 15;
      videoLeft = frameRect.width * 0.125 - 30;
      videoTop = frameRect.height * 0.17 - 20;
    } else if (screenWidth < 768) {
      // Mobile screens
      videoWidth = frameRect.width * 0.75 - 5;
      videoHeight = frameRect.height * 0.65 + 15;
      videoLeft = frameRect.width * 0.125 - 35;
      videoTop = frameRect.height * 0.17 - 25;
    } else if (screenWidth < 1024) {
      // Tablet screens
      videoWidth = frameRect.width * 0.78;
      videoHeight = frameRect.height * 0.68;
      videoLeft = frameRect.width * 0.11;
      videoTop = frameRect.height * 0.15;
    } else {
      // Desktop screens (1024px and above)
      videoWidth = frameRect.width * 0.82 - 100;
      videoHeight = frameRect.height * 0.72 - 5;
      videoLeft = (frameRect.width - videoWidth) / 2 - 110;
      videoTop = frameRect.height * 0.11 - 25;
    }

    return { videoWidth, videoHeight, videoLeft, videoTop };
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (frameRef.current) {
        const frameRect = frameRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const { videoWidth, videoHeight, videoLeft, videoTop } =
          calculateDimensions(frameRect, screenWidth);

        setDimensions({
          frame: { width: frameRect.width, height: frameRect.height },
          video: {
            width: videoWidth,
            height: videoHeight,
            left: videoLeft,
            top: videoTop,
          },
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (videoRef.current && dimensions.video.width) {
      const { width, height, left, top } = dimensions.video;
      videoRef.current.style.width = `${width}px`;
      videoRef.current.style.height = `${height}px`;
      videoRef.current.style.left = `${left}px`;
      videoRef.current.style.top = `${top}px`;
    }
  }, [dimensions]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // If the video is already loaded when the component mounts
      if (video.readyState >= 2) {
        setIsVideoLoaded(true);
      }

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-aos="fade-left"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
      className="w-full flex flex-col justify-center items-center relative"
    >
      <div className="relative inline-block w-full max-w-[1200px]">
        <img
          ref={frameRef}
          src={tvFrameSvg}
          alt="TV Frame"
          className="w-full h-auto"
        />
        <div
          className={`absolute inset-0 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute object-cover ${videoClassName}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TVVideoSection;
