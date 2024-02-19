import { createPool } from "mysql";
// this links env file
import { config } from "dotenv";
config()

let connection = createPool({
    host: +process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
    connectionLimit: 30
})
export{
    connection
}