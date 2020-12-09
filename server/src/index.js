const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const Playlist = require("./modal/Playlist");
require("dotenv").config();

const app = express();

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yotube-db";
const ytApiKey = process.env.YOUTUBE_API_KEY;
const port = process.env.PORT || 4000;
const ytApiUrl = "https://www.googleapis.com/youtube/v3";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.error("Unable to connect to mongodb!");
  }
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>Server is running</h1>"));

app.get("/getData", async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (e) {
    res.status(500).json({ error: true, message: "Something went wrong!" });
  }
});

app.post("/postData", async (req, res) => {
  try {
    if (!ytApiKey) throw Error();
    const playlists = await Promise.all(
      req.body.map(async (playlist) => {
        const { data: playlistRes } = await axios.get(
          `${ytApiUrl}/playlists?key=${ytApiKey}&part=contentDetails,id,snippet&id=${playlist.playlistId}`
        );
        playlist.playlistDesc = playlistRes.items[0].snippet.description;
        playlist.playlistThumbnail =
          playlistRes.items[0].snippet.thumbnails.default.url;
        playlist.totalVideos = playlistRes.items[0].contentDetails.itemCount;
        // playlist.videos = [];
        const { data } = await axios.get(
          `${ytApiUrl}/playlistItems?key=${ytApiKey}&part=contentDetails&playlistId=${playlist.playlistId}&maxResults=50`
        );
        playlist.videos = await Promise.all(
          data.items.map(async (video) => {
            const { data: videoRes } = await axios.get(
              `${ytApiUrl}/videos?key=${ytApiKey}&part=contentDetails,snippet&id=${video.contentDetails.videoId}`
            );
            return {
              title: videoRes.items[0].snippet.title,
              url: `https://www.youtube.com/watch?v=${videoRes.items[0].id}`,
              id: videoRes.items[0].id,
              length: videoRes.items[0].contentDetails.duration,
              desc: videoRes.items[0].snippet.localized.description,
              thumbnail: videoRes.items[0].snippet.thumbnails.default.url,
            };
          })
        );
        return playlist;
      })
    );
    await Playlist.insertMany([...playlists]);
    res
      .status(201)
      .json({ success: true, message: "Playlists data successfully added!" });
  } catch (e) {
    if (e.code === 11000)
      return res.status(500).json({
        error: true,
        message: "Some playlists from CSV file, already exists!",
      });
    res.status(500).json({ error: true, message: "Something went wrong!" });
  }
});

app.listen(4000, () => console.log("Server is running at", port));
