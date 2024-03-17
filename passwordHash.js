const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plaintextPassword) => {
  return new Promise((resolve, reject) => {

    bcrypt
    .hash(plaintextPassword, saltRounds)
      .then((hash) => resolve(hash))
      .catch((err) => {
        console.log("Error hashing password! ", err);
        return reject(err);
      });
  })
  
};

const verifyPassword = (plaintextPassword, hashedPasswordFromDatabase) => {
  // Compare entered password with hashed password from the database
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      plaintextPassword,
      hashedPasswordFromDatabase,
      (err, result) => {
        if (err) {
          // Handle error

          console.log(err);
          reject(err);
        }

        resolve(result); // true or false
      }
    );
  })
  
};

module.exports = {hashPassword, verifyPassword};

