import { Client } from 'pg';
import { credentials } from '../db-credentials';

class DatabaseClient {

    client: Client;

    constructor () {
        this.client = new Client();
    }

    async createDatabase (): Promise<Client> {
    
        const client = new Client(credentials);
    
        try {
            await client.connect();
        
            let userDb = client.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL,
                    nick VARCHAR(20) NOT NULL UNIQUE,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR NOT NULL
                );
            `);
    
            try {
                await Promise.all([userDb]);
                this.client = client;
                return client;
    
            } catch (err) {
                throw new Error(err);
            }
            
        } catch (err) {
            throw new Error(err);
        }
    }

}

const db = new DatabaseClient();
export default db;