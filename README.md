## YT Playlist App

## Setup

### 1. Clone the Repository
```
git clone https://github.com/abhi3315/yt-playlist-app.git
```

### 2. Setting up server
Go to server folder and download dependencies
```
cd server
npm i
```
Create a .env file inside server folder and provide the YT API key values mentioned below
```
YOUTUBE_API_KEY=<YT_V3_API_KEY>
```
Run the server
```
npm run start
```

### 3. Setting up client UI
Go to client folder and download dependencies
```
cd ../client
yarn
```
Give your server url inside client/src/utils.js
```
const url = '<YOUR_SERVER_URL>'
```
Run the client server
```
yarn start
```
