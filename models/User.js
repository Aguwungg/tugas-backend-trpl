const mongoose = require('mongoose');

// Membuat kerangka atau "cetakan" data pengguna
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Wajib diisi
    unique: true    // Tidak boleh ada username kembar di database
  },
  password: {
    type: String,
    required: true  // Wajib diisi
  }
});

// Mengekspor model ini agar bisa dipakai di file lain
module.exports = mongoose.model('User', userSchema);