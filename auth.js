const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");
//authentication
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
     // console.log("Recived credentials : ", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(user, false, { message: "Incorrect Password" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user); 
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
        console.log(err);
    }
  })
);

module.exports = passport;
