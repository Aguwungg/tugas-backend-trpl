require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // TAMBAHAN: Modul bawaan Node.js untuk mengatur folder

const authRoutes = require('./routes/auth'); 
const pesananRoutes = require('./routes/pesanan');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// TAMBAHAN: Memberi tahu Express lokasi folder UI kita
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes); 
app.use('/api/pesanan', pesananRoutes);

// UBAH JALUR UTAMA: Daripada mengirim teks, kita kirim file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

console.log('⏳ Sedang mencoba menghubungi MongoDB Atlas dengan IPv4...');

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4 
})
  .then(() => {
    console.log('✅ Database MongoDB berhasil terhubung!');
    app.listen(port, () => {
      console.log(`🚀 Server sedang berjalan di http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('❌ Gagal terhubung ke database:', error.message);
  });