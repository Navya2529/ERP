const { Room, Allocation } = require('../models');

/**
 * AUTO ALLOCATE HOSTEL ROOM
 */
exports.allocateHostel = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Prevent duplicate allocation
    const existing = await Allocation.findOne({ where: { studentId } });
    if (existing) {
      return res.status(400).json({ message: 'Student already allocated' });
    }

    // Find available room
    const rooms = await Room.findAll({
      include: [{ model: Allocation }]
    });

    let availableRoom = null;

    for (const room of rooms) {
      const occupied = room.Allocations.length;
      if (occupied < room.capacity) {
        availableRoom = room;
        break;
      }
    }

    if (!availableRoom) {
      return res.status(404).json({ message: 'No rooms available' });
    }

    // Allocate room
    const allocation = await Allocation.create({
      studentId,
      roomId: availableRoom.id
    });

    res.json({
      message: 'Hostel allocated successfully',
      roomNumber: availableRoom.roomNumber
    });

  } catch (error) {
    res.status(500).json({ message: 'Hostel allocation failed' });
  }
};

/**
 * HOSTEL OCCUPANCY STATS
 */
exports.hostelOccupancy = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [{ model: Allocation }]
    });

    const stats = rooms.map(room => ({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      occupied: room.Allocations.length
    }));

    res.json(stats);
  } catch {
    res.status(500).json({ message: 'Error fetching occupancy' });
  }
};
