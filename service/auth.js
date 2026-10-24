const jwt = require("jsonwebtoken");
const secretKey = "RandomSecretKeyForJWT"; // Replace with a secure secret key in production

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    secretKey,
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return null;
    }
    throw error;
  }
}

module.exports = {
  setUser,
  getUser,
};
