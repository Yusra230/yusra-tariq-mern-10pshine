//core module

//External module
import express from "express"

const noteItemRouter = express.Router();

//local module
import { getNotes, createNewNote, deleteNotes, updateNotes } from "../controllers/noteItemController.js";

noteItemRouter.get("/", getNotes);
noteItemRouter.post("/", createNewNote);
noteItemRouter.delete("/:id", deleteNotes);
noteItemRouter.put("/:id/updatenotes", updateNotes);

export default noteItemRouter;