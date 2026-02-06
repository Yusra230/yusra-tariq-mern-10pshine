
//External module
import express from "express"
import mongoose from 'mongoose';
import cors from "cors"
import noteItemRouter from "./routes/noteItemRouter.js";
import authRouter from "./routes/authRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";
//local module
import dotenv from 'dotenv';
const app = express();

dotenv.config();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use('/api/notes',noteItemRouter)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
  console.log("connected to mongo");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.log("error while connecting to mongo", err);
})

