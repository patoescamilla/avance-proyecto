const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.createReservation = async (req, res) => {
  const { hotel_id, start_date, end_date } = req.body;

  try {
    // obtener usuario desde token
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user_id = decoded.id;

    await db.query(
      `INSERT INTO reservations (user_id, hotel_id, start_date, end_date)
       VALUES (?, ?, ?, ?)`,
      [user_id, hotel_id, start_date, end_date]
    );

    res.status(201).json({ message: 'Reserva confirmada' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
};
