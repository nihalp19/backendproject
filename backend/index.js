import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./utils/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)

sequelize.authenticate().then(() => {
    console.log("DB CONNECTED")
    app.listen(PORT, () => {
        console.log(`SERVER STARTED AT PORT NO ${PORT}`)
    })
}).catch(err => console.error('Unable to connect to the database:', err))