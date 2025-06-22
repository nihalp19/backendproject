import PatientDoctorMapping from "../models/patientDoctorMapping.model.js";
import Doctor from "../models/doctors.model.js";
import { z } from "zod"


const MappingSchema = z.object({
    patientId: z.string().min(1, "Patient ID is required"),
    doctorId: z.string().min(1, "Doctor ID is required"),
});

export const assignDoctor = async (req, res) => {

    try {
        const parsed = MappingSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.errors.map(err => ({
                    field: err.path[0],
                    err: err.message
                }))
            })
        }

        const { patientId, doctorId } = parsed.data

        const existingMapping = await PatientDoctorMapping.findOne({
            where: { patientId, doctorId }
        });

        if (existingMapping) {
            return res.status(400).json({
                message: "This doctor is already assigned to the patient"
            });
        }

        const newMapping = await PatientDoctorMapping.create({
            patientId,
            doctorId,
            createdBy : req.user.id
        })

        return res.status(201).json({ message: "Doctor Assigned Successfully", mapping: newMapping })
    } catch (error) {
        console.log("error while assigning doctor", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}


export const getAllmapping = async (req, res) => {

    try {
        const allMapping = await PatientDoctorMapping.findAll({})
        return res.status(200).json({ message: "All Mapping Fetched Successfully", mapping: allMapping })
    } catch (error) {
        console.log("error while fetching mappings", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

export const getAllDrsAssigned = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const mappings = await PatientDoctorMapping.findAll({
            where: { patientId },
            include: [
                {
                    model: Doctor,
                    attributes: ['id', 'name', 'specialistIn', 'licenseNo', 'phoneNo']
                }
            ]
        });

        if (mappings.length === 0) {
            return res.status(404).json({ message: "No doctors assigned to this patient" });
        }

        return res.status(200).json({
            message: "Doctors fetched successfully",
            doctors: mappings.map(m => m.Doctor)
        });

    } catch (error) {
        console.error("Error fetching doctors for patient:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const removeDoctor = async (req, res) => {

    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }

        const mapping = await PatientDoctorMapping.findByPk(id)

        if (!mapping) {
            return res.status(404).json({ message: "Mapping Not Found" })
        }

        await mapping.destroy()

        return res.status(200).json({ message: "Doctor is remove Successfully" })

    } catch (error) {
        console.log("error while removing doctor", error.message)
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

}