const { getUser } = require("../service/auth.js");
const restrictToLoggedInUserOnly = (req, res, next) => {
  const sessionId = req.cookies.uid;
  if (!sessionId) {
    return res.redirect("/login");
  }
  const user = getUser(sessionId);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const sessionId = req.cookies.uid;
  const user = getUser(sessionId);
  req.user = user;
  next();
};
module.exports = { restrictToLoggedInUserOnly, checkAuth };
