import express from "express";
import {
  addHisabController,
  deleteHisabController,
  editHisabController,
  getAllHisabController,
} from "../controllers/hisabController.js";
const router = express.Router();

//POST || addHisab
router.post("/addHisab", addHisabController);

//GET || getAllHisab
router.post("/allHisab", getAllHisabController);

//delete || delete hisab
router.delete("/deleteHisab/:id", deleteHisabController);

//put || edit hisab

router.put("/editHisab/:id", editHisabController);

export default router;
