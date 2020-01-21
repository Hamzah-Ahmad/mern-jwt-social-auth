const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

//@route POST api/auth
//@desc authenticating users
//@access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
      jwtFunc(user, res);
    });
  });
});

//@route GET api/auth/facebook
//@desc signin with Facebook
//@access Public
router.post("/facebook", (req, res) => {
  const { name, email, userID } = req.body;
  User.findOne({ fbId: userID }).then(user => {
    if (!user) {
      const newUser = new User({
        name: name,
        fbId: userID
      });
      newUser.save().then(user => {
        jwtFunc(user, res);
      });
    } else {
      jwtFunc(user, res);
    }
  });
});

//@route GET api/auth/google
//@desc signin with Google
//@access Public
router.post("/google", (req, res) => {
  const { name, email, userID } = req.body;
  User.findOne({ googleId: userID }).then(user => {
    if (!user) {
      const newUser = new User({
        name: name,

        googleId: userID
      });
      newUser.save().then(user => {
        jwtFunc(user, res);
      });
    } else {
      jwtFunc(user, res);
    }
  });
});

//@route GET api/auth/user
//@desc get user data
//@access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then(user => res.json(user));
});

//Function for jwt signing
function jwtFunc(user, res) {
  jwt.sign(
    { _id: user._id },
    config.get("jwtSecret"),
    { expiresIn: 2629746 }, //One month in seconds
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
}

module.exports = router;
