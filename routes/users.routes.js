const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const isAuth = require('../util/isAuth');
const canConsultUsers = require('../util/canConsultU')
const canConsultR = require('../util/canConsultR');
const canAddUser = require('../util/canAddUser');
const canSeeUsers = require('../util/canSeeUsers');
const canDeleteUser = require('../util/canDeleteUser');


router.get('/signUp', usersController.getSignUp);
router.post('/signUp', usersController.postSignUp);

router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

router.get('/consultUsers', isAuth, canConsultUsers, canConsultR, canSeeUsers, canAddUser, canDeleteUser, usersController.getConsultUsers);

router.get('/logout', usersController.getLogout);

router.get('/addUser', isAuth, canConsultR, canConsultUsers, canSeeUsers, canAddUser, usersController.getAddUser);
router.post('/addUser', isAuth, canConsultR, canConsultUsers, canSeeUsers, canAddUser, usersController.postAddUser);

module.exports = router;