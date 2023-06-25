import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      console.log(token);
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.body.userId = decoded.id;
    req.body.username = decoded.username;
    next();
  });
};

const authJwt = {
  verifyToken
}

export default authJwt;

