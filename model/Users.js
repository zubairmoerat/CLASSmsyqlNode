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
}
export{
    Users
}