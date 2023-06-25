import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

// Schema.
// date - Date object, stored as ISO Date
// username - name of the author, stored as a string
// userId - objectId of the user adding the transaction, stored as a string
// transactionId
// body - string

const addPost = async (req, res) => {
  const { date, username, userId, transactionId, body } = req.body;

  db.posts
    .insertOne({
      date: new Date(date),
      username: username,
      userId: userId,
      transactionId: transactionId,
      body: body,
    })
    .then((result) => {
      console.log("Post added successfully!");
      res.status(200).send({ message: `Post added successfully!` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

const getNextPosts = async (req, res) => {
  const { userId } = req.body;
  const { pageNumber, limit } = req.params;
  let friendIds = []; // Declare the variable with a default value

  await db.users
    .findOne({
      _id: new ObjectId(userId),
    })
    .then((result) => {
      friendIds = result.friends;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });


  db.posts
    .find({ $or: [{ userId: { $in: friendIds } }, { userId: userId }] })
    .sort({ date: -1 })
    .skip((pageNumber - 1) * limit)
    .limit(Number(limit))
    .toArray()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

export { addPost, getNextPosts };
