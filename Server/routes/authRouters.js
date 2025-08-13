const { signup, login } = require('../controllers/authControllers');
const { signUpValidation, loginValidation } = require('../middlewares/authValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signUpValidation, signup);

module.exports = router;
