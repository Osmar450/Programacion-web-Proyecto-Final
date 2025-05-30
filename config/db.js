import { createPool } from 'mysql2/promise'; // Importa createPool para manejar conexiones a MySQL con soporte para Promesas
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde un archivo .env

export const pool = createPool({
  host: process.env.DB_HOST,       // Dirección del servidor de base de datos (por ejemplo, localhost)
  user: process.env.DB_USER,       // Usuario con permisos para acceder a la base de datos
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
