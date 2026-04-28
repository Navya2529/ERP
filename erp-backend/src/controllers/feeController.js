const { FeeTransaction } = require('../models');

/**

* PAY FEES
  */
  exports.payFees = async (req, res) => {
  try {
  const { studentId, amount } = req.body;

  const fee = await FeeTransaction.create({
  student_id: studentId,
  amount: amount,
  payment_date: new Date(),
  payment_status: 'PAID'
  });

  res.json({
  message: 'Payment successful',
  feeId: fee.fee_id
  });

} catch (error) {
console.error(error);
res.status(400).json({ message: 'Payment failed' });
}
};

/**

* CHECK FEE STATUS
  */
  exports.getFeeStatus = async (req, res) => {
  try {
  const studentId = req.params.studentId;

  const fees = await FeeTransaction.findAll({
  where: { student_id: studentId }
  });

  if (!fees.length) {
  return res.status(404).json({
  message: "No fee records found"
  });
  }

  res.json(fees);

} catch (error) {
console.error(error);
res.status(500).json({
message: 'Error fetching fee status'
});
}
};
