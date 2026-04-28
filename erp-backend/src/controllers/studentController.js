const Student = require("../models/Student");
const User = require("../models/User");


/**
 * CREATE STUDENT (ADMISSION)
 */
exports.createStudent = async (req, res) => {
  try {

    const { first_name, last_name, email } = req.body;

    if (!first_name || !email) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    // create login user
    const user = await User.create({
      username: email,
      email: email,
      password: "123456",
      role: "STUDENT"
    });

    // create student profile
    const student = await Student.create({
      ...req.body,
      user_id: user.user_id
    });

    res.status(201).json({
      message: "Student created successfully",
      student
    });

  } catch (error) {

    console.error("Create student error:", error);

    res.status(400).json({
      message: "Student creation failed",
      error: error.message
    });
  }
};


/**
 * GET STUDENT PROFILE
 */
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (error) {
    console.error("Fetch student error:", error);

    res.status(500).json({
      message: "Error fetching student"
    });
  }
};


/**
 * UPDATE STUDENT
 */
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await student.update(req.body);

    res.json({
      message: "Student updated successfully",
      student
    });

  } catch (error) {
    console.error("Update student error:", error);

    res.status(400).json({
      message: "Update failed",
      error: error.message
    });
  }
};


/**
 * GET ALL STUDENTS (ADMIN)
 * Supports pagination for large datasets
 */
exports.getAllStudents = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const students = await Student.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]]
    });

    res.json({
      totalStudents: students.count,
      currentPage: page,
      totalPages: Math.ceil(students.count / limit),
      data: students.rows
    });

  } catch (error) {
    console.error("Fetch students error:", error);

    res.status(500).json({
      message: "Error fetching students"
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {

    console.log("JWT USER:", req.user);

    const student = await Student.findOne({
      where: { email: req.user.email }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    res.json(student);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message
    });

  }
};