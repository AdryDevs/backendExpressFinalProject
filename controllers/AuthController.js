
const models = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const AuthController = {};

//Login 
AuthController.login = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await models.User.findOne({ 
        where: { email } });
    if (!userFound) {
        res.status(400).json({ message: 'User or password not valid' });
    return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    if (hashedPassword !== userFound.password) {
        console.log(hashedPassword + ' ' + userFound.password);
        res.status(401).json({ message: 'User or password not valid' });
        return
    }
    console.log(userFound);
    const secret = process.env.JWT_SECRET || "mysecretword";

    if (secret.length < 1) {
        throw new Error('JWT secret not defined');
    }

    //Generate token
        const token = jwt.sign({
            id: userFound.id,
            email: userFound.email,
            created: Date.now(),
            role: userFound.role
        }, authConfig.secret, {
            expiresIn: 86400 
        });

    res.status(200).json({ token });
      message = "User logged in successfully";
      jwt: token
    }

//Register new user and generate token
AuthController.register = async (req, res) => {
    const { email, password } = req.body;

    if (await models.user.findOne({ where: { email:email } })) {
      return res.status(400).send({ error: 'User already exists' });
  }   

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await models.user.create ({
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user.id }, "hola", {
            expiresIn: authConfig.expires
        });

        res.send({ user, token });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
}


module.exports = AuthController;