const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Student = sequelize.define(
  "Student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    registration_no: DataTypes.STRING,

    first_name: DataTypes.STRING,

    last_name: DataTypes.STRING,

    gender: DataTypes.STRING,

    dob: DataTypes.DATE,

    email: DataTypes.STRING,

    phone: DataTypes.STRING,

    course: DataTypes.STRING,

    department: DataTypes.STRING,

    year: DataTypes.INTEGER,

    semester: DataTypes.INTEGER,

    admission_status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;