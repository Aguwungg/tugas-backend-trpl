require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

// MENGHUBUNGKAN FILE ROUTES
const authRoutes = require('./routes/auth'); 
const pesananRoutes = require('./routes/pesanan'); // Tambahan file rute pesanan

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MENDAFTARKAN JALUR API
app.use('/api/auth', authRoutes); 
app.use('/api/pesanan', pesananRoutes); // Mengaktifkan jalur API pesanan

// JALUR UTAMA (Test)
app.get('/', (req, res) => {
  res.send('Mantap! Server dan Database sudah siap menerima perintah!');
});

console.log('⏳ Sedang mencoba menghubungi MongoDB Atlas dengan IPv4...');

// KONEKSI KE MONGODB
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