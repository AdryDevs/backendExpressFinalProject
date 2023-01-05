const models = require("../models/index");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { secret } = require("../config/auth");
const { REPL_MODE_SLOPPY } = require("node:repl");


// Check if the email is already registered

async function assertEmailIsUniqueService(email) {
  // validate email is unique
  const user = await models.users.findOne({
    where:{ email: email }});
  if (user) {
    throw new Error("Email is already registered");
  }
}

 // Create a new user

async function createUserService(userBody) {
  let day;
  const hash = encryptPassword(userBody.password);
  day=new Date().getDay();
  if (day=="0") {
    day=`0${new Date().getDate()}`;
  }
  userBody.password = hash;
  let created=await models.users.create({
    username:userBody.username,
    email:userBody.email,
    password:hash,
    id_role:2,
    createdAt: `${new Date().getFullYear()}-${new Date().getMonth()}-${day} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    updatedAt: `${new Date().getFullYear()}-${new Date().getMonth()}-${day} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  });

  return created;
}

  // Encrypt the password

function encryptPassword(password) {
  const hash = crypto
    .createHmac("sha512", process.env.SECRET_KEY)
    .update(password)
    .digest("base64");
  return hash;
}

// Check if the token is valid.

function verifyToken(req,res,next){
const bearerHeader= req.headers['authorization'];
if(typeof bearerHeader!=="undefined"){
   const token= bearerHeader.split(" ")[1];
   req.token=token;
   next();
}else{
    res.sendStatus(403);
}
}

async function isValidUserAndPassword(user, pass) {
    const userFound = await models.users.findOne({ email: user });
    if (userFound) {
      const hash = encryptPassword(pass);
      return hash === userFound.password;
    }
    return false;
  }



module.exports = {
  assertEmailIsUniqueService,
  createUserService,
  encryptPassword,
  verifyToken,
  isValidUserAndPassword
};