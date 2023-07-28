-- CreateTable
CREATE TABLE "Perusahaan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "Perusahaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "stok" INTEGER NOT NULL,
    "kode" TEXT NOT NULL,
    "perusahaan_id" TEXT NOT NULL,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_perusahaan_id_fkey" FOREIGN KEY ("perusahaan_id") REFERENCES "Perusahaan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
