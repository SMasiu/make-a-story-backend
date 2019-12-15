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
                    id SERIAL PRIMARY KEY,
                    nick VARCHAR(20) NOT NULL UNIQUE,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR NOT NULL
                );
            `);

            let storiesDb = client.query(`
                CREATE TABLE IF NOT EXISTS stories (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(40) NOT NULL,
                    description VARCHAR(5000) NOT NULL,
                    cover_path VARCHAR(25) NOT NULL
                );
            `);
    
            let fragmentsDb = client.query(`
                CREATE TABLE IF NOT EXISTS fragments ( 
                    id SERIAL PRIMARY KEY,
                    content VARCHAR(5000) NOT NULL,
                    pos_num INTEGER NOT NULL,
                    pub_date DATE NOT NULL,
                    author INTEGER references users(id) NOT NULL,
                    story INTEGER references stories(id) NOT NULL
                )
            `);

            try {
                await Promise.all([userDb, storiesDb, fragmentsDb]);
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