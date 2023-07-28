export type PerusahaanData = {
    id: string;
    nama: string;
    alamat: string;
    no_telp: string;
    kode: string;
}

export type PerusahaanRequest = {
    nama: string;
    alamat: string;
    no_telp: string;
    kode: string;
}

export type BarangData = {
    id: string;
    nama: string;
    harga: number;
    stok: number;
    kode: string;
    perusahaan_id: string;
}

export type BarangRequest = {
    nama: string;
    harga: number;
    stok: number;
    kode: string;
    perusahaan_id: string;
}

export type User = {
    username: string;
    password: string;
    name: string;
}
