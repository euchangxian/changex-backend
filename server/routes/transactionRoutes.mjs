import express from "express";
import authJwt from "../middlewares/authJwt.mjs";
import { addTransaction, getTransactions, getSpendingByMonthYear, deleteTransaction, getSpendingByCategoryInYear, compareSpendingByCategory } from "../controllers/transactionController.mjs";

const router = express.Router();

router.post(
  "/addtransaction",
  authJwt.verifyToken,
  addTransaction
);

router.get(
  "/transactions",
  authJwt.verifyToken,
  getTransactions
);

router.get(
  "/getspending/:date",
  authJwt.verifyToken,
  getSpendingByMonthYear
);

router.delete(
  "/transactions/:id",
  authJwt.verifyToken,
  deleteTransaction
);

router.get(
  "/getspendingbycategory/:year",
  authJwt.verifyToken,
  getSpendingByCategoryInYear
);

router.get(
  "/comparespending/:date",
  authJwt.verifyToken,
  compareSpendingByCategory
);

export default router;