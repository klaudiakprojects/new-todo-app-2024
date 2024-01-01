import { Client } from 'pg'
const express = require('express');
const app = express();
const cors = require('cors');

const corsSettings = {
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', "OPTIONS"], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsSettings));

app.options('*', cors(corsSettings)) 

app.use(express.json());

app.get('/', (req: any, res: any) => {
    console.log(req)
    res.send('Serwer działa')
});

app.get('/todos', async (req: any, res: any) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const result = await client.query(
        'SELECT * FROM todos ORDER BY id ASC'
    );
    console.log(result.rows)
    res.status(200).send(result.rows);
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
    await client.end()
    res.status(200).end();
});

app.patch('/todos/:id', async (req: any, res: any) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const result = await client.query(
        'UPDATE todos SET name=$2, status=$3 WHERE id=$1 ',
        [req.params.id, req.body.name, req.body.status]
    );

    await client.end()
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, OPTIONS');

    res.status(200).end();
});

app.delete('/todos/:id', async (req: any, res: any) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const result = await client.query(
        'DELETE FROM todos WHERE id=$1',
        [req.params.id]
    );

    await client.end()
    // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, OPTIONS');

    res.status(200).end();
});

app.delete('/todos', async (req: any, res: any) => {
    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    })
    await client.connect()

    const result = await client.query(
        'DELETE FROM todos',
    );

    await client.end()
    // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, OPTIONS');

    res.status(200).end();
});

app.listen(8888, () => {
})
