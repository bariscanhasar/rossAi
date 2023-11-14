import { Connection, createConnection, getConnectionManager } from 'typeorm';
import ormConfig from './config/ormconfig';

export const dbCreateConnection = async (): Promise<Connection> => {
    try {
        const connectionManager = getConnectionManager();
        const connectionName = ormConfig.name ?? 'default'; // Use 'default' as a default value if ormConfig.name is undefined

        if (connectionManager.has(connectionName)) {
            const activeConnection = connectionManager.get(connectionName);
            if (!activeConnection.isConnected) {
                await activeConnection.connect();
            }
            return activeConnection;
        }

        const connection = await createConnection({ ...ormConfig, name: connectionName });
        console.log(`Database connection success. Connection name: '${connection.name}' Database: '${connection.options.database}'`);
        await connection.runMigrations(); // Automatically create database tables based on entities
        return connection;
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
};
