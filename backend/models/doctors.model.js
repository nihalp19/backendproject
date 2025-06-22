import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import User from "./user.model.js";


const Doctor = sequelize.define('Doctor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialistIn : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    licenseNo: {
        type: DataTypes.STRING,
        allowNull: false
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


}, { timestamps: true, tableName: 'doctors' })


User.hasMany(Doctor, { foreignKey: 'createdBy' });
Doctor.belongsTo(User, { foreignKey: 'createdBy' });

export default Doctor