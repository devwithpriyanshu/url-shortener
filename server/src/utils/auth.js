import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import Jwt from "jsonwebtoken";
const secret = `${process.env.SECRET}`;
function setUser(user) {
  return Jwt.sign(
    {
      username: user.username,
      email: user.email,
    },
    secret,
    {
      expiresIn: "24h",
    }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return Jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export { setUser, getUser };
