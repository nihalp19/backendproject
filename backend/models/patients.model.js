import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import User from "./user.model.js";


const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disease : {
        type : DataTypes.STRING,
        allowNull : true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, { timestamps: true, tableName: 'patients' },
)


User.hasMany(Patient, { foreignKey: 'createdBy' });
Patient.belongsTo(User, { foreignKey: 'createdBy' });

export default Patient