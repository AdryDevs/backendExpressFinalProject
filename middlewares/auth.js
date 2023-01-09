const { isValidUserAndPassword } = require("../services/auth.services.js");
const jsonwebtoken = require("jsonwebtoken");

//check if the user is authenticated

const authBearerMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "You are not authenticated" });
    return; 
  }
  const [strategy, jwt] = authorization.split(" ");
  try {
    if (strategy.toLowerCase() !== "bearer") {
      throw new Error("Invalid strategy");
    }
    console.log(process.env.JWT_SECRET);
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    console.log("111111111111111");
    const created = payload.created;

    const timeElapsed = Date.now() - created;
    const MAX_TIME = Number(process.env.MAX_TIME_JWT_CADUCITY) ||
      1000 * 60 * 60 * 24 * 30; // 30 days
    const isValid = timeElapsed && created && MAX_TIME &&
      (timeElapsed < MAX_TIME);

    if (!isValid) {
      throw new Error("Token expired");
    }

    // expose the payload to the next middlewares and controllers
    req.auth = payload;
    next();

  } catch (error) {
    res.status(401).json({ message: "You are not authenticated" });
    return;
  }

};

//check if the user is admin

const isValidRoleAdmin =  (req, res, next) => {
  console.log(req.auth?.role);
  if (req.auth?.role === 1) {
    next();
  } else {
    res.status(403).json({ message: "You are not authorized" });
  }
}

module.exports = { authBearerMiddleware,isValidRoleAdmin};