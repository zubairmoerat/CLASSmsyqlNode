import express from 'express'
import bodyParser from "body-parser";
import { users } from "../model/index.js";
import { verifyToken } from "../middleware/authenticateUser.js";

const userRouter = express.Router()
userRouter.get('/',(req, res)=>{
    try{
        users.fetchUsers(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve users."
        })
    }
})
userRouter.get('/:id', (req, res)=>{
    try {
        users.fetchUser(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a user.'
        })
    }
})
userRouter.post('/register', bodyParser.json(), (req, res)=>{
    try{
        users.createUser(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Unable to add user."
        })
    }
})
export{
    userRouter, 
    express
}