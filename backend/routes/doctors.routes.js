import express from "express"
import { protectedRouted } from "../middleware/protectedRouted.js"
import { addDoctor,deleteDoctor, getAllDoctors, getDoctor, updateDoctorDetails } from "../controllers/doctors.controller.js"


const router = express.Router()

router.post("/",protectedRouted,addDoctor)
router.get("/",protectedRouted,getAllDoctors)
router.get("/:id",protectedRouted,getDoctor)
router.put("/:id",protectedRouted,updateDoctorDetails)
router.delete("/:id",protectedRouted,deleteDoctor)


export default router