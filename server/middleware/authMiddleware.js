const jwt = require('jsonwebtoken');
const User = require('/server/models/user');
exports.protect = async (req, res, next) => {

let token;
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
token = req.headers.authorization.split(' ')[1];
}

if (!token) {
return res.status(401).json({ msg: 'Not authorized, no token' });
}

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.user.id).select('-password');
next();

} catch (err) {
console.error(err.message);
res.status(401).json({ msg: 'Not authorized, token failed' });
}

};
