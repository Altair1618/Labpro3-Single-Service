import { Request, Response } from 'express';

import { BarangData, BarangRequest } from '../types';
import { db } from '../util/db';
import { barangSchema } from '../validator/barangValidator';

export const getBarang = async (req: Request, res: Response) => {
    console.log("GET /barang");

    const query = req.query.q || '';
    const perusahaan = req.query.perusahaan || '';

    if (typeof query !== 'string' || typeof perusahaan !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Format query salah',
            data: null
        });
    }

    try {
        const barang = await db.barang.findMany({
            where: {
                OR: [
                    {
                        nama: {
                            contains: query
                        }
                    },
                    {
                        kode: {
                            contains: perusahaan
                        }
                    }
                ]
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Barang berhasil ditemukan',
            data: barang
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Barang gagal ditemukan',
            data: null
        });
    }
}

export const getBarangById = async (req: Request, res: Response) => {
    console.log("GET /barang/:id")

    const id = req.params.id;

    try {
        const barang = await db.barang.findUnique({
            where: {
                id: id
            }
        });

        if (barang) {
            const data: BarangData = {
                id: barang.id,
                nama: barang.nama,
                harga: barang.harga,
                stok: barang.stok,
                kode: barang.kode,
                perusahaan_id: barang.perusahaan_id
            }

            return res.status(200).json({
                status: 'success',
                message: 'Barang berhasil ditemukan',
                data: data
            });
        } else {
            return res.status(204).json({
                status: 'success',
                message: 'Barang tidak ditemukan',
                data: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Barang gagal ditemukan',
            data: null
        });
    }
}

export const addBarang = async (req: Request, res: Response) => {
    console.log("POST /barang");

    const data: BarangRequest = barangSchema.parse(req.body);

    try {
        const barang = await db.barang.create({
            data: {
                nama: data.nama,
                harga: data.harga,
                stok: data.stok,
                kode: data.kode,
                perusahaan_id: data.perusahaan_id
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Barang berhasil ditambahkan',
            data: barang
        });
    } catch (error) {
        console.log(data);

        return res.status(500).json({
            status: 'error',
            message: 'Barang gagal ditambahkan',
            data: null
        })
    }
}

export const updateBarang = async (req: Request, res: Response) => {
    console.log("PUT /barang/:id");

    const id = req.params.id;
    const data: BarangRequest = barangSchema.parse(req.body);

    try {
        const barang = await db.barang.update({
            where: {
                id: id
            },
            data: {
                nama: data.nama,
                harga: data.harga,
                stok: data.stok,
                kode: data.kode,
                perusahaan_id: data.perusahaan_id
            }
        });
        
        return res.status(200).json({
            status: 'success',
            message: 'Barang berhasil diupdate',
            data: barang
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Barang gagal diupdate',
            data: null
        });
    }
}

export const deleteBarang = async (req: Request, res: Response) => {
    console.log("DELETE /barang/:id");

    const id = req.params.id;

    try {
        const barang = await db.barang.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Barang berhasil dihapus',
            data: barang
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Barang gagal dihapus',
            data: null
        });
    }
}
