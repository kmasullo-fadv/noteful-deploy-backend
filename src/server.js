require('dotenv').config()
const app = require('./app')
const knex = require('knex')

const { PORT, NODE_ENV, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});
app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening in ${NODE_ENV} mode on port http://localhost:${PORT}`)
})