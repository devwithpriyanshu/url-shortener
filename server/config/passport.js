import passport from "passport";
import LocalStrategy from "passport-local";
import { validatePassword } from "../utils/password.utils.js";
import User from "../src/models/user.model.js";

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) return done(null, false);
        const isValid = validatePassword(
          password,
          user.passwordHash,
          user.passwordSalt
        );
        if (!isValid) return done(null, false);
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
