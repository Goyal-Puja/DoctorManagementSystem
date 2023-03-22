const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController , getAllDoctrsController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController)

//REGISTER || POST
router.post('/register', registerController);
//Auth || POST
router.post('/getUserData', authMiddleware, authController)
//Apply by Doctor
router.post('/apply-doctor', authMiddleware, applyDoctorController);
//notification || POST
router.post('/get-all-notification',authMiddleware, getAllNotificationController);

//GET ALL DOC
router.get('/getAllDoctors', authMiddleware, getAllDoctrsController)
module.exports = router;

