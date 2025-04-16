const db = require('../config/db');

exports.addProduct = async (req, res) => {
  const { name, quantity, price } = req.body;
  const photo = req.file?.filename;

  await db.query(
    'INSERT INTO product (name, quantity, photo, price) VALUES (?, ?, ?, ?)',
    [name, quantity, photo, price]
  );

  res.json({ message: 'Product added successfully' });
};
