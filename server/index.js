// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());

// Serve static files like index.html, js, css
app.use(express.static(path.join(__dirname, "..", "public")));

// Stream video files
app.get("/videos/:filename", (req, res) => {
  const filePath = path.join(__dirname, "..", "public", "videos", req.params.filename);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    res.writeHead(416, { "Content-Range": `bytes */${fileSize}` });
    return res.end();
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  const file = fs.createReadStream(filePath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4",
  });

  file.pipe(res);
});

app.listen(PORT, () => {
  console.log(`✅ Video server running at http://localhost:${PORT}`);
});
