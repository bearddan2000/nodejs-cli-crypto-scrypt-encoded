const crypto = require('crypto');
let original = 'myPassword';
let test = "somePassword";

let main = async () => {

  const salt = await crypto.randomBytes(8).toString("hex");

  crypto.scrypt(original, salt, 64, (err, hash) => {
    // Store hash
    console.log("Password: %s hashed", original);
    crypto.scrypt(test, salt, 64, (err, testKey) => {
      console.log("Compare password %s to %s", test, original);
      if (hash.toString('hex') == testKey.toString('hex')) {
       // Passwords match
       console.log("Match: true");
      } else {
       // Passwords don't match
       console.log("Match: false");
      }
    });
    crypto.scrypt(original, salt, 64, (err, originalKey) => {
      console.log("Compare password %s to %s", original, original);
      if (hash.toString('hex') == originalKey.toString('hex')) {
       // Passwords match
       console.log("Match: true");
      } else {
       // Passwords don't match
       console.log("Match: false");
      }
    });
  });
}

main();
