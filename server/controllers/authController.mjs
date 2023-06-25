import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;

const signup = (req, res) => {
  const { username, password } = req.body;
  // checking for duplicate username is done by the verifySignUp middleware. Hence we can assume no duplicate
  // usernames will be passed into the authController.
  // synchronous hashing because signup is called after verifySignUp, prevents setting http headers repeatedly.
  const hashed = bcrypt.hashSync(password, saltRounds);
  const newUser = {
    username: username,
    password: hashed,
    friends: []
  };
  db.users.insertOne(newUser).then(result => {
    console.log(`User ${newUser.username} registered successfully!`);
    return res.status(200).send({ message: "User was registered successfully!" });

  }).catch(error => {
    console.log(error);
    return res.status(500).send({ message: error });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  db.users.findOne({ username: username }).then(user => {
    if (!user) {
      console.log("User not found.");
      return res.status(400).send({ message: "User not found." });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        console.log("Incorrect password!")
        return res.status(400).send({
          accessToken: null,
          message: "Incorrect password!"
        });
      }
      const token = jwt.sign(
        { id: user._id.toString(), username: username },
        process.env.SECRET,
        {
          expiresIn: 24 * 60 * 60 // 24 hours
        }
      );
      res.cookie("jwtToken", token, {
        httpOnly: true, // Prevent client-side access to the cookie
        secure: true, // Only send the cookie over HTTPS
        sameSite: "strict", // Limit cookie inclusion in third-party contexts
      });
      // sends the token back to the client. NOTE remove this once deployed. Currently here for ease of development
      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token
      });
    }).catch(error => {
      console.log(error);
      res.status(500).send({ message: error });
    });
  });
};

const logout = (req, res) => {
  res.clearCookie("jwtToken");
  res.status(200).send("Logout successful");
};

const getUser = (req, res) => {
  const { username } = req.body;
  res.status(200).send(username);
};

export { signup, login, logout, getUser };
