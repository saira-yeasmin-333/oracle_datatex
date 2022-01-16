const router = require('express').Router()
const AuthController=require('../../controller/authController')
const adminMiddleWare=require('../../services/adminValidation')

const authController=new AuthController()
//any user can sign up here(admin,staff,buyer)
router.post('/signup',authController.signup)
//any user can sign in here(admin,staff,buyer)
router.post('/signin',authController.signin)
//any user can reset password  here(admin,staff,buyer)
router.post('/resetPass',authController.resetPassword)

//these part only for admins
router.get('/getStaffs/:id',adminMiddleWare,authController.getEmployees)//admin can see all staffs
router.delete('/delete/:id',adminMiddleWare,authController.delete)//admin can delete any staff
module.exports=router