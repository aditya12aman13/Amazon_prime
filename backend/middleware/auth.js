const jwt = require('jsonwebtoken');
const SECRET = 'prime_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    req.isSuperuser = decoded.isSuperuser;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.isAdmin || req.isSuperuser) next();
    else res.status(403).json({ error: 'Requires admin role' });
  });
};

module.exports = { verifyToken, verifyAdmin, SECRET };
