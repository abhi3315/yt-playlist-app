## YT Playlist App

![image](https://user-images.githubusercontent.com/43412958/116909137-6585ba00-ac61-11eb-8384-cb3ad14f3a29.png)

![image](https://user-images.githubusercontent.com/43412958/116909171-733b3f80-ac61-11eb-9e7f-da2d935e39eb.png)

![image](https://user-images.githubusercontent.com/43412958/116909215-85b57900-ac61-11eb-9f7a-8178237bee22.png)

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
