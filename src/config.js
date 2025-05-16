import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST = 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'DenzelMarin';
export const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
export const DB_DATABASE = process.env.DB_DATABASE || 'moto_repuestos_leyton_1';




export const PORT2 = process.env.PORT2 || 3000;
export const DB_HOST2 = process.env.DB_HOST2 || 'localhost';
export const DB_PORT2 = process.env.DB_PORT2 || 3306;
export const DB_USER2 = process.env.DB_USER2 || 'DenzelMarin';
export const DB_PASSWORD2 = process.env.DB_PASSWORD2 || '123456';
export const DB_DATABASE2 = process.env.DB_DATABASE2 || 'datamart';