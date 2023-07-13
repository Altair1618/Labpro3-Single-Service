import { z } from 'zod';

export const perusahaanSchema = z.object({
    nama: z.string(),
    alamat: z.string(),
    no_telp: z.string(),
    kode: z.string().regex(/^[A-Z]{3}$/)
});
