
//External module
import express from "express"
import mongoose from 'mongoose';
const DB_PATH = "mongodb+srv://yusratariqdev_db_user:notesappp@notesapp.ejxi915.mongodb.net/";
import cors from "cors"
import noteItemRouter from "./routes/noteItemRouter.js";
//local module

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use('/api/notes',noteItemRouter)
// app.use(errorController.pagenotfound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log("connected to mongo");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.log("error while connecting to mongo", err);
})

