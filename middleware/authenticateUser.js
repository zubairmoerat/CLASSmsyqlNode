import { config } from "dotenv";
config()

import {sign, verify} from "jsonwebtoken";

function createToken(user){
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    })
}

function verifyToken(req, res, next){
    const token = req?.headers['Authorization']
    if(token){
        if(verify(token, process.env.SECRET_KEY)){
            next()
        }else {
            res?.json({
                status: res.satusCode,
                msg: "Access Denied, Incorrect Credentials."
            })
        }
    }else{
        res?.json({
            status: res.satusCode,
            msg: "Please Login."
        })
    }
}

export{
    createToken,
    verifyToken
}