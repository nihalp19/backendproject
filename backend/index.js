import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./utils/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import patientsRoutes from "./routes/patients.routes.js"
import doctorsRoutes from "./routes/doctors.routes.js"
import mappingRoutes from "./routes/mapping.routes.js"

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/patients", patientsRoutes)
app.use("/api/doctors", doctorsRoutes)
app.use("/api/mappings", mappingRoutes)

app.all("/", async (req, res) => {
  return res.send("Backend is Running")
})

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(8080, () => {
      console.log('SERVER STARTED AT PORT NO 8080');
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });