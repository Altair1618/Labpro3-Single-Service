import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { BarangRequest } from '../types';

export const validateBarang = (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: BarangRequest = barangSchema.parse(req.body);

        res.locals.data = data;
        next();
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Format data perusahaan salah',
            data: null
        });
    }
}

const barangSchema = z.object({
    nama: z.string(),
    harga: z.number().positive(),
    stok: z.number().nonnegative(),
    kode: z.string(),
    perusahaan_id: z.string().uuid()
});
