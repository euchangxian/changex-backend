import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import {
  addBudget,
  updateBudget,
  getBudget,
} from "../controllers/budgetController.mjs";

const router = express.Router();

router.post(
  "/addbudget", 
  authJwt.verifyToken, 
  addBudget
);

router.post(
  "/updatebudget/:date", 
  authJwt.verifyToken, 
  updateBudget
);

router.get(
  "/getbudget/:date", 
  authJwt.verifyToken, 
  getBudget
);

export default router;
