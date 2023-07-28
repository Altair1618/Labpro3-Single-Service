import { PrismaClient } from '@prisma/client';
import hashPassword from '../src/util/hasher';

const prisma = new PrismaClient();

function generateAdminData() {
  const data = {
    username: 'ffff',
    password: hashPassword('1234'),
    name: 'Far',
  }

  return data;
}

function generatePerusahaanData() {
  const data = [];

  for (let i = 1; i <= 10; i++) {
    const perusahaan = {
      nama: `Perusahaan ${i}`,
      alamat: `Jalan ${i}`,
      no_telp: `08${i.toString().padStart(2, '0')}`,
      kode: `P${i.toString().padStart(2, '0')}`,
    };

    data.push(perusahaan);
  }
  
  return data;
}

function generateBarangData(perusahaanIds: string[]) {
    const data = [];

    for (let i = 1; i <= 50; i++) {
        const barang = {
            nama: `Barang ${i}`,
            harga: i * 1000,
            stok: i * 10,
            kode: `B${i.toString().padStart(2, '0')}`,
            perusahaan_id: perusahaanIds[Math.floor(Math.random() * perusahaanIds.length)]
        }

        data.push(barang);
    }

    return data;
}

async function seedDatabase() {
  try {
    await prisma.user.deleteMany();
    await prisma.barang.deleteMany();
    await prisma.perusahaan.deleteMany();
    
    const adminData = generateAdminData();

    const admin = await prisma.user.create({
      data: {
        username: adminData.username,
        password: await adminData.password,
        name: adminData.name,
      },
    });

    const perusahaanData = generatePerusahaanData();
    const perusahaanIds = [];

    for (const data of perusahaanData) {
      const perusahaan = await prisma.perusahaan.create({
        data: {
          nama: data.nama,
          alamat: data.alamat,
          no_telp: data.no_telp,
          kode: data.kode,
        },
      });

      perusahaanIds.push(perusahaan.id);
    }

    const barangData = generateBarangData(perusahaanIds);

    for (const data of barangData) {
      await prisma.barang.create({
        data: {
          nama: data.nama,
          harga: data.harga,
          stok: data.stok,
          kode: data.kode,
          perusahaan_id: data.perusahaan_id,
        },
      });
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
