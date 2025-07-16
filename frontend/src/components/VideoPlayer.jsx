import React, { useState } from "react";

const videos = [
  "bedroom.mp4",
  "bedroom1.mp4",
  "diningroom.mp4",
  "landscape.mp4",
  "library.mp4",
  "lobby main.mp4",
  "lobby.mp4",
  "lobby1.mp4",
  "lobby2.mp4",
  "office.mp4",
  "reception.mp4",
  "yoga.mp4"
];

function VideoPlayer() {
  const [current, setCurrent] = useState(videos[0]);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        width="80%"
        height="auto"
        controls
        src={`/videos/${current}`}
        style={{ borderRadius: "12px", marginBottom: "20px" }}
      ></video>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {videos.map((v, i) => (
          <button
            key={i}
            onClick={() => setCurrent(v)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#333",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            {v.replace(".mp4", "")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;
