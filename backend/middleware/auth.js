const jwt = require('jsonwebtoken')
const JWT_SECRET = "gaurav is great he is a true hustler and one day he will achieve his dreams";

const auth = async (req, res, next) => {
    try{
        //console.log(req.body)
        const authHeader = req.headers.authorization;
        if(!authHeader){
            res.status(401).send('please provide auth token');
        }

        const token = authHeader.split(' ')[1];
        //jwt verify methods return an object which contains payload
        const data =  jwt.verify(token,JWT_SECRET);
        if(!data){
            return res.status(401).send('invalid token')
        }
        //we are sending payload data to req.user feild
        req.user = data;
        next()
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
}

module.exports = auth;