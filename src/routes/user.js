const express = require('express');
const userProfileMiddleware = require('../controller/user/middlewares/user-profile-middleware');
const router = express.Router();

const userController = require('../controller/user/user-controller');

router.post('/profile', userProfileMiddleware.bodyValidateFields, userController.postUserProfile);

router.get('/profile', userController.getAllUserProfile);

router.get('/:id/profile', userProfileMiddleware.idValidate, userController.getUserProfile);

router.put('/:id/profile', userProfileMiddleware.bodyValidateFields, userProfileMiddleware.idValidate, userController.updateUserProfile);

router.delete('/:id/profile', userProfileMiddleware.idValidate, userController.deleteUserProfile);

module.exports = router;