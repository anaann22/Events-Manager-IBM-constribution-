const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers("x-auth-token");

    if(!token){
        return res.status(401).send("Access denied, Not authenticated");
    }

    try {
        const secret = process.env.JWT_SECRET || 'secret';
        const decoded = jwt.verify(token, secret);
        req.userId = decoded._id;
        next();
    } catch(err) {
        res.status(400).send("Access denied. Invalid data");
    }
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if(req.userId.isAdmin) {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized");
        }
    });
};

module.exports = { auth, isAdmin };