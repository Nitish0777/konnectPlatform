import JWT from "jsonwebtoken";

//middleware to check if the user is logged in or not
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token", token);
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "You are not logged in",
      });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("decoded", decoded);
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "You are not logged in",
      error: error.message,
    });
  }
};
