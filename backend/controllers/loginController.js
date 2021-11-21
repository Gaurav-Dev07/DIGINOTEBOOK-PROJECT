const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.login = async (req, res, err) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { error } = loginSchema.validate(req.body);
  let success = false;
  if (error) {
    res.send("validation error");
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (checkPassword) {
        const payload = { _id: user._id };

        const JWT_SECRET = "gaurav is great he is a true hustler and one day he will achieve his dreams";

        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.status(200).json({ success, authToken });
      } else {
        success = false;
        res.status(400).send({success , err :"Invalid Password"});
      }
    } else {
      success = false;
      return res.status(400).send({success , err : "Email not found"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

exports.getuser = async (req, res, err) => {
  try {
    //console.log(req.body)
    const _id = req.user._id
    //this select method will remove those fields which has - as prefix
    const data = await User.findById(_id).select('-password');

    res.status(200).send(data);
  } catch (err) {
    console.log(err)
    res.status(500).send('internal server error')
  }
}
