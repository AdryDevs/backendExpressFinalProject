module.exports = {
    secret: process.env.JWT_SECRET || "mysecretword",
    expires: process.env.AUTH_EXPIRES || "24h",
    rounds: process.env.AUTH_ROUNDS || 15
}

