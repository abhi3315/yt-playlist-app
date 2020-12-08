const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  title: String,
  level: String,
  language: String,
  quality: String,
  category: String,
  subCategory: String,
  subject: String,
  playlistLink: String,
  playlistId: { type: String, unique: true },
  playlistDesc: String,
  playlistThumbnail: String,
  totalVideos: String,
  videos: [
    {
      title: String,
      url: String,
      id: String,
      length: String,
      desc: String,
      thumbnail: String,
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
