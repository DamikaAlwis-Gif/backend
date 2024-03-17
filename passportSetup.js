const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const {veriyPassword, verifyPassword} = require("./passwordHash");

passport.use(new LocalStrategy(
  function(username, password, done) {
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
    User.findOne({userName: username})
    .then((user) => {
      if(!user){
        done(null, false, { msg: "Incorrect username" });
      };
      verifyPassword(password, user.password)
        .then((result) => {
          if (!result) {
            done(null, false, { msg: "Incorrect password" });
          }

          return done(null, user);
        })
        .catch((err) => {
          done(err);
        });

    })
    .catch((err) => done(err))
    


  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  const user = User.findById(id);
  done(null, user);
});