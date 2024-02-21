import { connection as db } from "../config/index.js";
import { hash,compare } from "bcrypt";
import { createToken } from "../middleware/authenticateUser.js";

class Users{
    fetchUsers(req, res) {
        const qry = `
        SELECT userID, firstName, lastName, userAge, gender, emailAdd, userRole
        FROM Users;
        `
        db.query(qry, (err, results)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
    fetchUser(req, res){
        const qry = `
        SELECT userID, firstName, lastName, userAge, gender, emailAdd, userRole
        FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(qry, (err, result)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }   
    async createUser(req, res){
        let data = req.body
        data.userPwd = await hash(data?.userPwd, 10)
        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }
        const qry = `
        INSERT INTO Users
        SET ?;
        `
        db.query(qry, [data] ,(err)=>{
            if(err) {
                res.json({
                    status: res.statusCode,
                    msg: "This account already exists"
                })
            }else {
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: "Your account has been registered"
                })
            }
        })
    }
    async updateUser(req, res){
        const data = req.body
        if(data?.userPwd){
            data.userPwd = await hash(data?.userPwd, 8)
        }
        const qry = `
        UPDATE Users
        SET ?
        WHERE userID = ${req.params.id}
        `
        db.query(qry, [data], (err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "You have successfully updated your account."
            })
        })
    }
    deleteUser(req, res){
        const qry = `
        DELETE FROM Users
        WHERE userID = ${req.params.id}
        `
        db.query(qry, [req.body], (err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Your Account has been deleted."
            })
        })
    }
    login(req, res){
        const {emailAdd, userPwd} = req.body
        const qry = `
        SELECT userID, firstName, lastName, userAge, gender, emailAdd, userPwd, userRole
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `
        db.query(qry, async(err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided the wrong email adress."
                })
            }else{
                const validPass = await compare
                (userPwd, result[0].userPwd)
                if(validPass){
                    const token = createToken({
                        emailAdd,
                        userPwd
                    })
                    res.json({
                        status: res.statusCode,
                        msg: "Login s",
                        token,
                        result: result[0]
                    })
                }else{
                    res.json({
                        status: res.statusCode,
                        msg: "Your password is incorrect"
                    })
                }
            }
        })
    }
}
export{
    Users
}