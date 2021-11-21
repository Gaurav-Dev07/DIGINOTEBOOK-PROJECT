const express = require('express')
const router = express.Router();
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')
const auth = require('../middleware/auth')

router.get('/' , (req,res) => {
    res.send("this is auth router");
})

router.post('/createUser',registerController.create);
router.post('/login',loginController.login)
//it is post request in code with harry and auth is named as fetch user
router.get('/getuser',auth,loginController.getuser)


module.exports = router;