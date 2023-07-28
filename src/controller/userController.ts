import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { db } from '../util/db';
import { User } from '../types';
import { accessToken } from '../configs';

export const login = async (req: Request, res: Response) => {
    // console.log("POST /login");

    const { username, password } = req.body;
    
    let user: User | null = null;

    try {
        user = await db.user.findUnique({
            where: {
                username: username
            }
        });
    } catch {
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
    
    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Username tidak ditemukan',
            data: null
        });
    }
    
    const valid = await bcryptjs.compare(password, user.password);
    
    if (!valid) {
        return res.status(400).json({
            status: 'error',
            message: 'Password salah',
            data: null
        });
    }

    const token = jwt.sign({
        username: user.username,
        name: user.name
    }, accessToken, {
        expiresIn: '1h'
    });

    res.json({
        status: 'success',
        message: 'Login berhasil',
        data: {
            user: {
                username: user.username,
                name: user.name
            },
            token: token,
        }
    });
}

export const getCurrentUser = async (req: Request, res: Response) => {
    // console.log("GET /self");

    const user: User = res.locals.user;

    return res.json({
        status: 'success',
        message: 'Berhasil mendapatkan data user',
        data: {
            username: user.username,
            name: user.name
        }
    });
}
