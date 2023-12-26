import { defineConfig } from "cypress";
import { Client } from "pg";


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async clearDatabase(queryString){
           await clearDatabase()
           return null;
        }
      })
    },
  },
})

async function clearDatabase() {
  const client = new Client({
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  })
  await client.connect();

  const res = await client.query('DELETE FROM todos');
  await client.end();
};