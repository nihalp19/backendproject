import Patient from "../models/patients.model.js";
import { z } from "zod"


const PatientSchema = z.object({
    name: z.string().min(1, "Name is Required"),
    age: z.number({ required_error: "Age is Required" }),
    gender: z.string().min(1, "Gender is Required"),
    phoneNo: z.string().min(10, "Phone number is Required and must be at least 10 digits"),
    disease: z.string().min(1, "Disease is Required"),
})


export const addPatient = async (req, res) => {

    try {
        const parsed = PatientSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            })
        }

        const { name, age, gender, disease, phoneNo } = parsed.data

        const patient = await Patient.create({
            name,
            age,
            gender,
            disease,
            phoneNo,
            createdBy: req.user.id
        })

        return res.status(201).json({ message: "Patient Created Successfully", patient })

    } catch (error) {
        console.log("error while creating patient", error, message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

export const getAllPatients = async (req, res) => {

    try {
        const patients = await Patient.findAll({})
        return res.status(200).json({ message: "ALL Patients are Feteched SuccessFully", patients: patients })
    } catch (error) {
        console.log("Error while fetching all patients", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}


export const getPatient = async (req, res) => {

    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const patient = await Patient.findByPk(id)

        if (!patient) {
            return res.status(400).json({ message: "patients not found" })
        }

        return res.status(200).json({ message: "Patients Found Successfully", patient })

    } catch (error) {
        console.log("error while finding patient", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}





export const updatePatientDetails = async (req, res) => {

    try {
        const id = req.params.id
        const parsed = PatientSchema.safeParse(req.body)

        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            })
        }

        const patient = await Patient.findByPk(id)
        if (!patient) {
            return res.status(400).json({ message: "Patients Not found" })
        }

        await patient.update(parsed.data)

        return res.status(200).json({ message: "Patient Updated Successfully", patient })
    } catch (error) {
        console.log("error while updating patient", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "Id Not found" })
        }

        const patient = await Patient.findByPk(id)

        if (!patient) {
            return res.status(400).json({ message: "Patient Not Found" })
        }

        await patient.destroy()

        return res.status(200).json({ message: "Patient Deleted Successfully" })
    } catch (error) {
        console.log("error while updating patient", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

