const express = require('express');
const userProfileMiddleware = require('../controller/user/middlewares/user-profile-middleware');
const router = express.Router();

const userController = require('../controller/user/user-controller');

router.post('/profile', userProfileMiddleware.postValidateFields, userController.postUserProfile);

router.get('/profiles', userController.getAllUserProfile);

router.get('/:id/profile', userProfileMiddleware.getValidateFields, userController.getUserProfile);

router.put('/:id/profile', userProfileMiddleware.putValidateFields, userController.updateUserProfile);

router.delete('/:id/profile', userProfileMiddleware.deleteValidateFields, userController.deleteUserProfile);

module.exports = router;