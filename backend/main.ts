import { Client } from 'pg'
const express = require('express');
const app = express();

app.get('/', (req: any,res: any) => {
console.log(req)
});

app.listen(8888, () => {
})


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
