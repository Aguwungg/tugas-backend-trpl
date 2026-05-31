const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router(); // Ini kode yang benar

// --- 1. JALUR REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Registrasi berhasil! Akun sudah dibuat.' });

  } catch (error) {
    res.status(500).json({ message: 'Gagal registrasi, mungkin username sudah dipakai.', error: error.message });
  }
});

// --- 2. JALUR LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // A. Cek apakah username ada di database
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: 'Username tidak ditemukan!' });
    }

    // B. Cocokkan password yang diketik dengan password acak di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah!' });
    }

    // C. Jika benar, buatkan Token (Tiket Masuk)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // D. Berikan respons sukses berserta tokennya
    res.status(200).json({
      message: 'Login berhasil!',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
});

module.exports = router;