const express = require('express');
const userProfileMiddleware = require('../controller/user/middlewares/user-profile-middleware');
const router = express.Router();

const userController = require('../controller/user/user-controller');

router.post('/profile', userProfileMiddleware.postValidateFields, userController.postUserProfile);

router.get('/profiles', userController.getAllUserProfile)

module.exports = router;