const express = require('express')
const { getDoctorInfoController, updateProfileController } = require('../controllers/doctorController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);

module.exports = router