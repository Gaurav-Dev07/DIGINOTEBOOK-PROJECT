const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

exports.create = async (req, res, err) => {
  try {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      repeat_password: Joi.ref("password")
    });
    console.log(req.body)
    const { error } =  registerSchema.validate(req.body);
    console.log(err)

    if (error) return res.status(400).send("validation error");

    const exist = await User.findOne({ email: req.body.email });
    if (!exist) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
    
      const result = await user.save();

      //jwt token requires three args 1.header,2.payload,3. secret
      const payload = { _id : result._id}
      const JWT_SECRET = "gaurav is great he is a true hustler and one day he will achieve hi dreams"

      const authToken = jwt.sign(payload,JWT_SECRET);

      res.status(200).json({authToken});
    } else {
      return res.status(400).send("email already exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
