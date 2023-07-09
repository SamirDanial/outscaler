const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    console.log('it comes here')
    if(!token) {
        return res.status(401).json({msg: 'Authorization failed, Access denied'});
    }

    try{
        const decoded = jwt.verify(token, config.get('secret'));

        req.user = decoded.user;
        console.log(req.user)
        next();
    } catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }
}