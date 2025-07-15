import { useState, useEffect, useRef } from "react";

export default function VideoPlayer() {
  const [src, setSrc] = useState("videos/lobby.mp4");
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
  }, [src]);

  const changeScene = (scene) => {
    setSrc(`videos/${scene}.mp4`);
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
    <div className="w-full h-screen bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-80 text-white text-xl">
          Loading...
        </div>
      )}
      <video
        id="video-player"
        ref={videoRef}
        src={src}
        autoPlay
        controls={false}
        loop
        muted
        className="w-full h-full object-cover"
        playsInline
      />
      <div className="absolute top-6 left-6 z-20 flex space-x-4">
        <button
          onClick={() => changeScene("lobby")}
          className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-40 transition"
        >
          Lobby
        </button>
        <button
          onClick={() => changeScene("living")}
          className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-40 transition"
        >
          Living Room
        </button>
        <button
          onClick={() => changeScene("bedroom")}
          className="bg-white bg-opacity-20 text-white px-4 py-2 rounded hover:bg-opacity-40 transition"
        >
          Bedroom
        </button>
      </div>
      <div
        onClick={handleProgressClick}
        className="absolute bottom-10 left-0 right-0 h-2 bg-gray-700 cursor-pointer z-20"
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
