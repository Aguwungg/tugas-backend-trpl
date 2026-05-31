const mongoose = require('mongoose');

// Membuat cetakan data pesanan
const pesananSchema = new mongoose.Schema({
  nama_pelanggan: {
    type: String,
    required: true
  },
  jenis_pakaian: {
    type: String,
    required: true
  },
  jumlah: {
    type: Number,
    required: true
  },
  tahapan_produksi: {
    type: String,
    default: 'Menunggu Antrean' // Jika tidak diisi, otomatis statusnya ini
  }
});

module.exports = mongoose.model('Pesanan', pesananSchema);