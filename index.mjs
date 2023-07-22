import "./loadEnvironment.mjs";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.mjs";
import transactionRoutes from "./routes/transactionRoutes.mjs";
import budgetRoutes from "./routes/budgetRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import friendsRoutes from "./routes/friendsRoutes.mjs";
import repliesRoutes from "./routes/repliesRoutes.mjs";

const PORT = process.env.PORT || 5050;
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));

// TODO: Load routes
// status 200 is sent for successful login/signup.
// status 400 is sent for incorrect username/password.
// status 500 is sent for errors.
app.use(authRoutes);

// status 200 is sent for successful CRUD requests
// status 500 is sent for errors.
app.use(transactionRoutes);

app.use(budgetRoutes);

app.use(postRoutes);

app.use(friendsRoutes);

app.use(repliesRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`); // Wrap string within ` (backtick) instead of " for string formatting
});
