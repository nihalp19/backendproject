import Doctor from "../models/doctors.model.js";
import { z } from "zod"


const DoctorSchema = z.object({
    name: z.string().min(1, "Name is Required"),
    specialistIn: z.string().min(1, "Specialisation is Required"),
    licenseNo: z.string().min(1, "License No is Required"),
    gender: z.string().min(1, "Gender is Required"),
    phoneNo: z.string().min(1, "Phone No is required")
})



export const addDoctor = async (req, res) => {
    try {
        const parsed = DoctorSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: parsed.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            })
        }

        const { name, specialistIn, licenseNo, gender, phoneNo } = parsed.data

        const doctor = await Doctor.findOne({ where: { licenseNo } })

        if (doctor) {
            return res.status(400).json({ message: "Doctor already Exits" })
        }

        const newDoctor = await Doctor.create({
            name,
            specialistIn,
            licenseNo,
            gender,
            phoneNo,
            createdBy: req.user.id
        })

        return res.status(201).json({ message: "Doctor Created Successfully",doctor : newDoctor })

    } catch (error) {
        console.log("error while creating doctor", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getAllDoctors = async (req, res) => {

    try {
        const doctors = await Doctor.findAll({})

        if (!doctors) {
            return res.status(400).json({ message: "doctors not found" })
        }

        return res.status(200).json({ message: "Doctors Fetched Successfully", doctors })
    } catch (error) {
        console.log("error while fetching doctors", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}



export const getDoctor = async (req, res) => {

    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const doctor = await Doctor.findByPk(id)
        if (!doctor) {
            return res.status(400).json({ message: "Doctor Not Found" })
        }

        return res.status(200).json({ message: "Doctor Found Successfully", doctor })

    } catch (error) {
        console.log("erroe while fetching doctors", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const updateDoctorDetails = async (req, res) => {

    try {
        const { id } = req.params
        const parsed = DoctorSchema.safeParse(req.body)

        if (!id) {
            return res.status(400).json({ messsgae: "id is required" })
        }

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(err => ({
                    field: err.path[0],
                    err: err.message
                }))
            })
        }

        const doctor = await Doctor.findByPk(id)

        if (!doctor) {
            return res.status(400).json({ message: "Doctor not found" })
        }

        await doctor.update(parsed.data)
        return res.status(200).json({ message: "Doctor details Updated successfully", doctor })
    } catch (error) {
        console.log("error while updating doctors", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}


export const deleteDoctor = async(req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message : "Id is required"})
        }

        const doctor = await Doctor.findByPk(id)
        if(!doctor){
            return res.status(400).json({message : "Doctor Not found"})
        }

        await doctor.destroy()

        return res.status(200).json({message : "Doctor Deleted Successfully"})
    } catch (error) {
        console.log("error while deleting doctor",error.message)
        return res.status(500).json({message : "Internal Server Error",error : error.message})
    }
}