import express from "express"
import { protectedRouted } from "../middleware/protectedRouted.js"
import { assignDoctor,getAllmapping,getAllDrsAssigned,removeDoctor } from "../controllers/mapping.controller.js"

const router = express.Router()

router.post("/",protectedRouted,assignDoctor)
router.get("/",protectedRouted,getAllmapping)
router.get("/:patientId",protectedRouted,getAllDrsAssigned)
router.delete("/:id",protectedRouted,removeDoctor)


export default router