import mysql =require("mysql2/promise")
import dotenv = require("dotenv")

dotenv.config()


const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env


if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error("Missing required DB env vars")
}

const pool= mysql.createPool({
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT? Number(DB_PORT):3306,
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    });

export=pool;