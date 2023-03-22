const express = require('express');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminController');
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware');

//GET METHOD || USERS
router.get('/getAllUsers',authMiddleware, getAllUsersController)

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//POST Account Status
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)

module.exports = router