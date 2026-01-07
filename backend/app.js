import express from 'express'
import mongoose from 'mongoose';

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World');
})

const PORT = 3000;

const DB_path = "mongodb+srv://yusratariqdev_db_user:notesappp@notesapp.ejxi915.mongodb.net/";

mongoose.connect(DB_path).then(() => {
  console.log("connected to mongo");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.log("error while connecting to mongo", err);
})
