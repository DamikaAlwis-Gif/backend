const express = require("express");
require("dotenv").config();
const connectToDb = require("./databaseSetup");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRouter = require("./Routes/authRouter");
const passportSetup = require("./passportSetup");
const port = process.env.PORT || 5001;
const secretKey = process.env.SECRET_KEY;
const session = require("express-session");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// app.use(
//   cookieSession({
//     name: "session", // cookie name
//     keys: [secretKey], // secret key to sign the cookie
//     maxAge: 24 * 60 * 60 * 1000 // 1 day
//   })
// );

app.use(
  session({
    secret: "your secret line of secretness",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());// It sets up Passport to work with Express
app.use(passport.session()); //It enables Passport to serialize and deserialize user instances to and from the session
connectToDb();

app.use("/api/auth",authRouter );






