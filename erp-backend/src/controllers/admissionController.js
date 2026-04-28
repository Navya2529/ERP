const Student = require('../models/Student');

/**
 * Approve student admission (ADMIN only)
 */
exports.approveAdmission = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.admission_status === 'APPROVED') {
      return res.status(400).json({
        message: 'Admission already approved'
      });
    }

    // Approve admission
    student.admission_status = 'APPROVED';
    await student.save();

    res.json({
      message: 'Admission approved successfully',
      studentId: student.studentId,
      status: student.admissionStatus
    });

  } catch (error) {
    res.status(500).json({ message: 'Admission approval failed' });
  }
};
