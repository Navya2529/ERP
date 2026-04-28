const {
  Student,
  FeeTransaction,
  Room,
  Allocation,
  Issue,
  Fine,
  Registration
} = require('../models');

const { fn, col } = require('sequelize');

/**
 * =========================
 * ADMIN DASHBOARD (MASTER)
 * =========================
 */

exports.adminDashboard = async (req, res) => {
  try {

    /* STUDENT INSIGHTS */

    const totalStudents = await Student.count();

    const approvedAdmissions = await Student.count({
      where: { admission_status: 'APPROVED' }
    });

    const pendingAdmissions = await Student.count({
      where: { admission_status: 'PENDING' }
    });

    /* COURSE DISTRIBUTION */

    const studentsByCourse = await Student.findAll({
      attributes: [
        'course',
        [fn('COUNT', col('course')), 'count']
      ],
      group: ['course']
    });

    /* FEES */

    const totalFeesCollected = await FeeTransaction.sum('amount', {
      where: { payment_status: 'PAID' }
    });

    const pendingFines = await Fine.sum('amount', {
      where: { paid: false }
    });

    /* EXAMS */

    const examRegistrations = await Registration.count();

    /* HOSTEL */

    const rooms = await Room.findAll({
      include: [Allocation]
    });

    const hostelOccupancy = rooms.map(room => ({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      occupied: room.Allocations.length
    }));

    /* LIBRARY */

    const issuedBooks = await Issue.count({
      where: { returnDate: null }
    });

    res.json({
      message: `Welcome Admin ${req.user.role}`,

      summary: {
        students: totalStudents,
        approvedAdmissions,
        pendingAdmissions,
        feesCollected: totalFeesCollected || 0,
        examRegistrations,
        issuedBooks,
        pendingFines: pendingFines || 0
      },

      insights: {
        studentsByCourse,
        hostelOccupancy
      }

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Admin dashboard failed",
      error: error.message
    });

  }
};


/**
 * =========================
 * ADMISSION DASHBOARD
 * =========================
 */

exports.admissionDashboard = async (req, res) => {

  const total = await Student.count();

  const approved = await Student.count({
    where: { admission_status: 'APPROVED' }
  });

  const pending = await Student.count({
    where: { admission_status: 'PENDING' }
  });

  const byCourse = await Student.findAll({
    attributes: [
      'course',
      [fn('COUNT', col('course')), 'count']
    ],
    group: ['course']
  });

  res.json({
    total,
    approved,
    pending,
    byCourse
  });

};


/**
 * =========================
 * FEE DASHBOARD
 * =========================
 */

exports.feeDashboard = async (req, res) => {

  const totalCollected = await FeeTransaction.sum('amount', {
    where: { payment_status: 'PAID' }
  });

  const transactions = await FeeTransaction.findAll();

  res.json({
    totalCollected: totalCollected || 0,
    transactions
  });

};


/**
 * =========================
 * HOSTEL DASHBOARD
 * =========================
 */

exports.hostelDashboard = async (req, res) => {

  const rooms = await Room.findAll({
    include: [Allocation]
  });

  const stats = rooms.map(room => ({
    roomNumber: room.roomNumber,
    capacity: room.capacity,
    occupied: room.Allocations.length
  }));

  res.json(stats);

};


/**
 * =========================
 * LIBRARY DASHBOARD
 * =========================
 */

exports.libraryDashboard = async (req, res) => {

  const issuedBooks = await Issue.count({
    where: { returnDate: null }
  });

  const pendingFines = await Fine.sum('amount', {
    where: { paid: false }
  });

  res.json({
    issuedBooks,
    pendingFines: pendingFines || 0
  });

};


/**
 * =========================
 * EXAM DASHBOARD
 * =========================
 */

exports.examDashboard = async (req, res) => {

  const registered = await Registration.count();

  const blockedStudents = await Fine.count({
    where: { paid: false }
  });

  res.json({
    registered,
    blockedStudents
  });

};