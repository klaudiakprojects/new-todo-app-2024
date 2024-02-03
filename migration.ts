import { Client } from 'pg'

const migration = async () => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const result = await client.query(
        `CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            status VARCHAR(255)
        );
        `
    );
    console.log(result.rows)
}

migration().then();