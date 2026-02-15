//core module

//External module
import express from "express"

const noteItemRouter = express.Router();

//local module
import  {protect}  from "../middleware/auth.js";
import { getNotes, createNewNote, deleteNotes, updateNotes } from "../controllers/noteItemController.js";

noteItemRouter.use(protect);
noteItemRouter.get("/", getNotes);
noteItemRouter.post("/", createNewNote);
noteItemRouter.delete("/:id", deleteNotes);
noteItemRouter.put("/:id/updatenotes", updateNotes);

export default noteItemRouter;