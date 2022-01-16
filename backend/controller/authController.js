const AuthRepository=require('../repository/authRepository')
const authRepository=new AuthRepository()
class AuthController {
    constructor() {
    }
    signup=async(req,res)=>{
        let result=await authRepository.signup(req.body)
        console.log(result,'in auth controller sign up')
        if (result.success) {
            res.status(200).json({
                success:true,
               // data:result
            });
        } else {
            switch (result.error){
                case process.env.ERROR_NO_USER:
                    res.status(404).json({
                        success: false
                    });
                    break;
                case process.env.ERROR_PASSWORD_MISMATCH:
                    res.status(401).json({
                        success: false
                    });
                    break;
            }

        }
    }
    signin=async(req,res)=>{
        let result=await authRepository.signin(req.body)
        if (result.success) {
            res.status(200).json({
                success:true,
                token:result.token
            });
        } else {
            switch (result.error){
                case process.env.ERROR_NO_USER:
                    res.status(404).json({
                        success: false
                    });
                    break;
                case process.env.ERROR_PASSWORD_MISMATCH:
                    res.status(401).json({
                        success: false
                    });
                    break;
            }
        }
    }

    resetPassword = async(req, res) => {
        let result = await authRepository.resetPassword(req.body)
        if (result.success) {
            res.status(200).json({
                success:true,
                token:result.token
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

    getEmployees = async(req, res) => {
        let result = await authRepository.getAllEmployees(req.params.id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    delete= async(req,res)=>{
        let result = await authRepository.delete(req.params.id)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

}

module.exports=AuthController