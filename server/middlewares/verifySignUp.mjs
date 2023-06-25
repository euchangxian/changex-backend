import db from "../db/conn.mjs";

const checkDuplicateUsername = (req, res, next) => {
  // Check duplicate username
  db.users.findOne({ username: req.body.username }).then(existingUser => {
    if (existingUser) {
      console.log("Username already taken!");
      return res.status(400).send({ message: "Username is already taken!" });
    }
    next();
  }).catch(error => {
    console.log(error);
    return res.status(500).send({ message: error });
  });
};

const verifySignUp = {
  // Could check duplicate email too.
  checkDuplicateUsername
};
export default verifySignUp;