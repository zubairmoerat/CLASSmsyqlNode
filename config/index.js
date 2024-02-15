import { createPool } from "mysql";
// this links env file
import { config } from "dotenv";
config()

let connection = createPool({
    host: +process.env.HOST,
    database: process.env.Database,
    user: process.env.USER,
    password: process.env.PASSWORD,
    multipleStatements: true,
    connectionLimit: 30
})
export{
    connection
}