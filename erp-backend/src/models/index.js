const User = require('./User');
const Student = require('./Student');
const FeeTransaction = require('./Fee');
const Hostel = require('./Hostel');
const Book = require('./Library');
const Exam = require('./Exam');
const Room = require('./Hostel');
const Allocation = require('./Allocation');
const Issue = require('./Issue');
const Registration = require('./Registration');
const Hallticket = require('./HallTicket');
const Fine = require('./Fine');

/* ================= ASSOCIATIONS ================= */

Room.hasMany(Allocation, { foreignKey: 'roomId' });
Allocation.belongsTo(Room, { foreignKey: 'roomId' });

Issue.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(Issue, { foreignKey: "bookId" });

/* ================= EXPORT ================= */

module.exports = {
  User,
  Student,
  FeeTransaction,
  Hostel,
  Book,
  Exam,
  Room,
  Allocation,
  Issue,
  Registration,
  Hallticket,
  Fine
};