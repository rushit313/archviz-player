import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import FloorplanOverlay from "./FloorplanOverlay";

export default function VideoPlayer() {
  const [scene, setScene] = useState("overview");
  const [overlay, setOverlay] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setIsLoading(false);
      setIsLoading(true);
      video.addEventListener("canplay", handleCanPlay);
      video.load();
      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [scene]);

  const handleSidebarClick = (section) => {
    setScene(section);
    setOverlay(section);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    if (video.duration) {
      video.currentTime = percentage * video.duration;
    }
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 text-white text-xl">
          Loading...
        </div>
      )}

      {/* Sidebar navigation */}
      <Sidebar onSelect={handleSidebarClick} />

      {/* Floorplan Overlay */}
      <FloorplanOverlay active={overlay} />

      {/* Video background */}
      <video
        ref={videoRef}
        src={`videos/${scene}.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Custom progress bar */}
      <div
        onClick={handleProgressClick}
        className="absolute bottom-6 left-0 right-0 h-2 bg-gray-800 cursor-pointer z-40"
      >
        <div
          className="h-full bg-red-500"
          style={{
            width: `${
              (videoRef.current?.currentTime / videoRef.current?.duration || 0) * 100
            }%`,
          }}
        />
      </div>
    </div>
  );
}
