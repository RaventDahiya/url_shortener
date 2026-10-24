const { getUser } = require("../service/auth.js");
const restrictToLoggedInUserOnly = (req, res, next) => {
  const sessionId = req.cookies.uid;
  if (!sessionId) {
    return res.redirect("/login");
  }
  const user = getUser(sessionId);
  if (!user) {
    res.clearCookie("uid");
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const sessionId = req.cookies.uid;
  const user = getUser(sessionId);
  if (!user && sessionId) {
    res.clearCookie("uid");
  }
  req.user = user;
  next();
};
module.exports = { restrictToLoggedInUserOnly, checkAuth };
