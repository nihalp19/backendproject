import { sequelize } from "../utils/db.js";
import Patient from "./patients.model.js";
import Doctor from "./doctors.model.js";
import { DataTypes } from "sequelize";


const PatientDoctorMapping = sequelize.define('PatientDoctorMapping', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        }
    },
    doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'doctors',
            key: "id"
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, { timestamps: true, tableName: 'PatientDoctormapping' })

PatientDoctorMapping.belongsTo(Doctor, { foreignKey: 'doctorId' });
PatientDoctorMapping.belongsTo(Patient, { foreignKey: 'patientId' });

Patient.belongsToMany(Doctor, {
    through: PatientDoctorMapping,
    foreignKey: 'patientId',
});
Doctor.belongsToMany(Patient, {
    through: PatientDoctorMapping,
    foreignKey: 'doctorId',
});



export default PatientDoctorMapping