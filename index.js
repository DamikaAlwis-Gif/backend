const express = require("express");
require("dotenv").config();
const connectToDb = require("./databaseSetup");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/userRouter");

const port = process.env.PORT || 5001;
const secretKey = process.env.SECRET_KEY;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use(
  cookieSession({
    name: "session", // cookie name
    keys: [secretKey], // secret key to sign the cookie
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
);

// Initialize Passport
app.use(passport.initialize());// It sets up Passport to work with Express
app.use(passport.session()); //It enables Passport to serialize and deserialize user instances to and from the session
connectToDb();

app.use("/api/users",userRouter );






