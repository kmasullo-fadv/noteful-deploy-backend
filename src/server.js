const app = require('./app')
const knex = require('knex')

const { PORT, NODE_ENV } = require('./config')

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});
app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening in ${NODE_ENV} mode on port http://localhost:${PORT}`)
})