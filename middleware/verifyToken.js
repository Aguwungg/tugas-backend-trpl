const jwt = require('jsonwebtoken');

// Fungsi middleware (satpam)
module.exports = function (req, res, next) {
  // 1. Mencari token dari header permintaan
  const token = req.header('auth-token');
  
  // 2. Jika tidak ada token, tolak aksesnya
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak! Anda harus login terlebih dahulu.' });
  }

  try {
    // 3. Jika ada token, verifikasi apakah token itu asli
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Lanjut ke proses input data
  } catch (error) {
    res.status(400).json({ message: 'Token tidak valid atau sudah kedaluwarsa!' });
  }
};