const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
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
    const playlistData = req.body.map(async (playlist) => {
      const { data: playlistRes } = await axios.get(
        `${ytApiUrl}/playlists?key=${ytApiKey}&part=contentDetails,cid,snippet&id=${playlist.playlistId}`
      );
      playlist.playlistDesc = playlistRes.items[0].snippet.description;
      playlist.playlistThumbnail =
        playlistRes.items[0].snippet.thumbnails.default.url;
      playlist.totalVideos = playlistRes.items[0].contentDetails.itemCount;
      const { data: playlistVideoRes } = await axios.get(
        `${ytApiUrl}/playlistItems?key=${ytApiKey}&part=contentDetailst&playlistId=${playlist.playlistId}&maxResults=50`
      );
      playlist.videos = playlistVideoRes.items.map(async (video) => {
        const videoRes = await axios.get(
          `${ytApiUrl}/videos?key=${ytApiKey}&part=contentDetailst,snippet&id=${video.contentDetails.videoId}`
        );
        return {
          title: video.snippet.title,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          id: video.id,
          length: video.contentDetails.duration,
          desc: video.snippet.localized.description,
          thumbnail: video.snippet.thumbnails.default.url,
        };
      });
      return { ...playlist };
    });
    res
      .status(500)
      .json({ success: true, message: "Data added successfully!" });
  } catch (e) {
    res.status(500).json({ error: true, message: "Something went wrong!" });
  }
});

app.listen(4000, () => console.log("Server is running at", port));
