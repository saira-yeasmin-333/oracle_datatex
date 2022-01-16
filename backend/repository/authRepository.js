const Repository=require('./connection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenExpiryDuration=86400

class AuthRepository extends Repository{
    constructor() {
        super();
    }

    signup=async data=>{
        const query1='select * from users where email = :0'
        const params1=[data.email]
        const result1=await this.sqlQuery(query1,params1)
        console.log(result1,'in sign in in auth repository')
        if(result1.data.length>0){
            return{
                success:false,
                error:process.env.ERROR_EMAIL_EXISTS
            }
        }
        const query='insert into users (name,phone,email,address,username,type,password) values (:0,:1,:2,:3,:4,:5,:6)'
        const params=[data.name,data.phone,data.email,data.address,data.username,data.type,bcrypt.hashSync(data.password, 10)]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in sign up in auth repository cls')
        return result
    }

    signin=async data=>{
        const query='select * from users where email = :0'
        const params=[data.email]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in sign in in auth repository')
        if(result.data.length==0){
            return{
                success:false,
                error:process.env.ERROR_NO_USER
            }
        }
        const pass=result.data[0]['PASSWORD']
        console.log(result.data[0])
        console.log('password in :',data.password,pass)
        //compare password
        if(bcrypt.compareSync(data.password, pass)) {
            var token = jwt.sign({
                id: result.data[0]['ID'],
                email: data.email,
                password: pass,
                type:result.data[0]['TYPE']
            }, process.env.JWT_SECRET_KEY, {expiresIn: `${tokenExpiryDuration}s`})
            return {
                success: true,
                token: token
            }
        }
        return {
            success:false,
            error:process.env.ERROR_PASSWORD_MISMATCH
        }

    }

    resetPassword=async data=>{
        const query='select * from users where email = :0'
        const params=[data.email]
        //first check whether this email exists
        const result=await this.sqlQuery(query,params)
        if(result.data.length==0)
            return {
                success:false,
                error:"no user found"
            }
        const updatePassQuery='update users set password=:1 where email=:0'
        let newPass=bcrypt.hashSync(data.password, 10)
        const updateParams = [newPass,data.email]
        var updateResult = await this.sqlQuery(updatePassQuery, updateParams)
        if(updateResult.success){
            var token = jwt.sign({
                id: result.data[0]['ID'],
                email: data.email,
                password: newPass,
                type:result.data[0]['TYPE']
            }, process.env.JWT_SECRET_KEY, {expiresIn: `${tokenExpiryDuration}s`})
            return {
                success: true,
                token: token
            }
        }
        return updateResult
    }

    tokenValidity=async (id,email,password)=>{
        const query='select * from users where id = :0 and email = :1 and password = :2'
        const params=[id,email,password]
        var result=await this.sqlQuery(query,params)
        return result.data.length!==0
    }

    getAllEmployees=async id=>{
        const query='select * from users where id <> :0 and type=2'
        const params=[id]
        var result=await this.sqlQuery(query,params)
        return result
    }

    delete=async id=>{
        const query='delete from users where id = :0'
        const params=[id]
        var result=await this.sqlQuery(query,params)
        return result
    }
}
module.exports=AuthRepository