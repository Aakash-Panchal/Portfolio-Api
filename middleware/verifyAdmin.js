const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    //Get token from header
    const Token = req.headers.authorization;

    // verify jwt token
    jwt.verify(Token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    //Send Error
    res.status(401).send({ Message: "Authorization Failed" });
  }
};

module.exports = verifyAdmin;
