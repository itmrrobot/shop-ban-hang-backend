const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async(req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch(e) {
        res.status(401).send({error:"Please authicate"})
    }
}

function authRole(role) {
    return (req,res,next) => {
        if(req.user.role!==role) return res.status(401).send("You not allowed!");
        next();
    }
}

module.exports = {auth,authRole};