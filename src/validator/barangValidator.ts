import { z } from 'zod';

export const barangSchema = z.object({
    nama: z.string(),
    harga: z.number().min(1),
    stok: z.number().min(0),
    kode: z.string(),
    perusahaan_id: z.string().uuid()
});
