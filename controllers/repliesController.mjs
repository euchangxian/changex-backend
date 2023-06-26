import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

// Schema.
// date - Date object, stored as ISO Date
// username - name of the author, stored as a string
// userId - objectId of the user adding the transaction, stored as a string
// postId - the post that the reply refers to
// body - string

const addReply = async (req, res) => {
  const { date, username, userId, postId, body } = req.body;

  db.replies
    .insertOne({
      date: new Date(date),
      username: username,
      userId: userId,
      postId: postId,
      body: body,
    })
    .then((result) => {
      console.log("Reply added successfully!");
      res.status(200).send({ message: `Reply added successfully!` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

const getReplies = async (req, res) => {
  const { postId } = req.params;

  db.replies
    .find({ postId: postId })
    .sort({ date: -1 })
    .toArray()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
};

export { addReply, getReplies };
