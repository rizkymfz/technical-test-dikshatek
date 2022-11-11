import dotenv from 'dotenv';
import path from 'path';

dotenv.config()

export const config = {
    serviceName : process.env.SERVICE_NAME,
    database: process.env.MONGO_URL,
    jwtKey : process.env.JWT_SECRET
}

export default config;