

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;

export const db = {
    connection: process.env.DB_CONNECTION || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    database: process.env.POSTGRES_DB || 'rossAi_db',
    password: process.env.POSTGRES_PASSWORD,
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
};


export const logDirectory = process.env.LOG_DIR;
