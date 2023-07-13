import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_TOKEN_SECRET = 'default-token-secret';
const accessToken = process.env.ACCESS_TOKEN_SECRET || DEFAULT_TOKEN_SECRET;

export { accessToken };
