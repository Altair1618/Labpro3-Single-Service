import { Request, Response } from "express";

import { PerusahaanData, PerusahaanRequest } from "../types";
import { db } from "../util/db";

export const getPerusahaan = async (req: Request, res: Response) => {
    // console.log("GET /perusahaan");

    const query = req.query.q || '';

    if (typeof query !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Format query salah',
            data: null
        });
    }

    try {
        const perusahaan = await db.perusahaan.findMany({
            where: {
                OR: [
                    {
                        nama: {
                            contains: query
                        }
                    },
                    {
                        kode: {
                            contains: query
                        }
                    }
                ]
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Perusahaan berhasil ditemukan',
            data: perusahaan
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Perusahaan gagal ditemukan',
            data: null
        });
    }
}

export const getPerusahaanById = async (req: Request, res: Response) => {
    // console.log("GET /perusahaan/:id")

    const id = req.params.id;

    try {
        const perusahaan = await db.perusahaan.findUnique({
            where: {
                id: id
            }
        });

        if (perusahaan) {
            const data: PerusahaanData = {
                id: perusahaan.id,
                nama: perusahaan.nama,
                alamat: perusahaan.alamat,
                no_telp: perusahaan.no_telp,
                kode: perusahaan.kode
            }

            return res.status(200).json({
                status: 'success',
                message: 'Perusahaan berhasil ditemukan',
                data: data
            });
        } else {
            return res.status(204).json({
                status: 'success',
                message: 'Perusahaan tidak ditemukan',
                data: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Perusahaan gagal ditemukan',
            data: null
        });
    }
}

export const addPerusahaan = async (req: Request, res: Response) => {
    // console.log("POST /perusahaan");

    try {
        const data: PerusahaanRequest = res.locals.data;
    
        const perusahaan = await db.perusahaan.create({
            data: {
                nama: data.nama,
                alamat: data.alamat,
                no_telp: data.no_telp,
                kode: data.kode,
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Perusahaan berhasil ditambahkan',
            data: perusahaan
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Perusahaan gagal ditambahkan',
            data: null
        })
    }
}

export const updatePerusahaan = async (req: Request, res: Response) => {
    // console.log("PUT /perusahaan/:id");

    const id = req.params.id;
    
    try {
        const data: PerusahaanRequest = res.locals.data;
    
        const perusahaan = await db.perusahaan.update({
            where: {
                id: id
            },
            data: {
                nama: data.nama,
                alamat: data.alamat,
                no_telp: data.no_telp,
                kode: data.kode,
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Perusahaan berhasil diupdate',
            data: perusahaan
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Perusahaan gagal diupdate',
            data: null
        });
    }
}

export const deletePerusahaan = async (req: Request, res: Response) => {
    // console.log("DELETE /perusahaan/:id");

    const id = req.params.id;

    try {
        const perusahaan = await db.perusahaan.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            status: 'success',
            message: 'Perusahaan berhasil dihapus',
            data: perusahaan
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Perusahaan gagal dihapus',
            data: null
        });
    }
}
