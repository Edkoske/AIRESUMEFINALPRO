// ...existing code...
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const JWT_SECRET = process.env.JWT_SECRET;

function signToken(payload) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not configured');
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Name, email and password are required' });

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = signToken({ id: user._id });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({ token, user: userObj });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = signToken({ id: user._id });

    const userObj = user.toObject();
    delete userObj.password;

    return res.json({ token, user: userObj });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Error fetching user' });
  }
};
// ...existing code...