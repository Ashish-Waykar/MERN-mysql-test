const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const profile_photo = req.file?.filename;

  const [userExists] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  if (userExists.length) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO user (name, email, password, profile_photo) VALUES (?, ?, ?, ?)', [
    name, email, hashedPassword, profile_photo
  ]);

  res.json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  const user = users[0];
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
};
