import express from "express"
import { protectedRouted } from "../middleware/protectedRouted.js"
import { addPatient,getAllPatients,getPatient,updatePatientDetails,deletePatient } from "../controllers/patients.controller.js"

const router = express.Router()

router.post("/", protectedRouted, addPatient)
router.get("/", protectedRouted, getAllPatients)
router.get("/:id", protectedRouted, getPatient)
router.put("/:id", protectedRouted,updatePatientDetails)
router.delete("/:id", protectedRouted,deletePatient)



export default router