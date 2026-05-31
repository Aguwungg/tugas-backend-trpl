const express = require('express');
const router = express.Router();
const Pesanan = require('../models/Pesanan'); // Memanggil cetakan pesanan
const verify = require('../middleware/verifyToken'); // Memanggil satpam

// JALUR 1: POST - Untuk Input Data Pesanan Baru (Dilindungi 'verify')
router.post('/', verify, async (req, res) => {
  try {
    const pesananBaru = new Pesanan({
      nama_pelanggan: req.body.nama_pelanggan,
      jenis_pakaian: req.body.jenis_pakaian,
      jumlah: req.body.jumlah,
      tahapan_produksi: req.body.tahapan_produksi
    });

    const simpanPesanan = await pesananBaru.save();
    res.status(201).json({ 
      message: 'Data pesanan berhasil ditambahkan!', 
      data: simpanPesanan 
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambah data', error: error.message });
  }
});

// JALUR 2: GET - Untuk Melihat Daftar Pesanan (Dilindungi 'verify')
router.get('/', verify, async (req, res) => {
  try {
    const semuaPesanan = await Pesanan.find();
    res.status(200).json(semuaPesanan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data', error: error.message });
  }
});

module.exports = router;