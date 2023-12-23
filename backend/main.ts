import { Client } from 'pg'
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

async function start() {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}
start().then()

app.get('/', (req: any, res: any) => {
    console.log(req)
    res.send('Serwer działa')
});

app.post('/todos', async (req: any, res: any) => {
    console.log(req.body);

    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const result = await client.query(
        'INSERT INTO todos (id, name, status) VALUES ($1, $2, $3)',
        [req.body.id, req.body.name, req.body.status]
      );
          console.log(result) // Hello world!
    await client.end()
    res.status(200).end();
});

app.listen(8888, () => {
})
