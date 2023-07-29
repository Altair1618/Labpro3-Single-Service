import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { PerusahaanRequest } from '../types';

export const validatePerusahaan = (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: PerusahaanRequest = perusahaanSchema.parse(req.body);

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

const perusahaanSchema = z.object({
    nama: z.string(),
    alamat: z.string(),
    no_telp: z.string(),
    kode: z.string().regex(/^[A-Z]{3}$/)
});
