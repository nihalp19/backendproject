import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./utils/db.js"

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())

sequelize.authenticate().then(() => {
    console.log("DB CONNECTED")
    app.listen(PORT, () => {
        console.log(`SERVER STARTED AT PORT NO ${PORT}`)
    })
}).catch(err => console.error('Unable to connect to the database:', err))