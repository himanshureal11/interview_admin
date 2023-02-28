var jwt = require('jsonwebtoken');
const { getUser } = require('../dao/user');
const { getValueByKey } = require('../helper/redis_helpers');

const isAuthenticated = async (req,res, next) => {
    const token =  JSON.parse(req.headers.token)
    try {
        const isVerified = jwt.verify(token, process.env.JWT_TOKEN)
        const redisValue = await getValueByKey(`user-${isVerified.user._id}`)
        if(redisValue){
            if(JSON.parse(redisValue) === token){
                const user = await getUser(isVerified.user._id)
                req.user = user
                next()
                return
            }
        }
    res.status(401).json({error: 'user not autheticated'})
    } catch (err) {
        res.status(401).json({error: err})
    }
}


module.exports = {
    isAuthenticated
}