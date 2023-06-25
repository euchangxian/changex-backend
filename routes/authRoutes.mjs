import express from "express";
import verifySignUp from "../middlewares/verifySignUp.mjs";
import { signup, login, logout, getUser } from "../controllers/authController.mjs";
import authJwt from "../middlewares/authJwt.mjs";

const router = express.Router();
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  verifySignUp.checkDuplicateUsername,
  signup
);

router.post(
  "/login/password",
  login
);

router.post(
  "/logout",
  logout
);

router.get(
  "/user",
  authJwt.verifyToken,
  getUser
);

export default router;