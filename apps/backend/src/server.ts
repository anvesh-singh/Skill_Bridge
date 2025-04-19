//@ts-nocheck

import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import mainrouter from "./routes/mainrouter";
import videoRouter from "./routes/videoUploadRouter";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// app.use(cors({
//   credentials: true,
//   origin: "http://localhost:5000",
// }));

app.use(bodyparser.json());
app.use("/", mainrouter);


app.use('/videos', express.static(path.join(__dirname,'uploads'))); 
// serve videos
app.use('/api/videos', videoRouter); // mount video routes

app.listen(process.env.PORT, (err) => {
  if (err) console.log("error ocurred");
  console.log(`app is listening on port ${process.env.PORT}`);
});