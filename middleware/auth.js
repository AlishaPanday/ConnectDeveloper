//import Json web token and config to get secret JWT
const jwt = require('jsonwebtoken');
const config = require('config');

//middleware has access to req/res objects and have next as call back that is run to move next
module.exports = function (req, res, next) {
  //GET token from header
  const token = req.header('x-auth-token');

  //check if missing token
  if (!token) {
    return res.status(401).json({ msg: 'Missing Token: Authorisation denied' });
  }

  //verify for valid token
  try {
    const decoded = jwt.verify(token, config.get('secretJWT'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
