const fs = require('fs');  //fs stands for File System

const { Pool } = require('pg');

databaseUrl =
//this block attempts to read the database URL from the env variable
//if it can't find it then it searches for the db URL file
  process.env.DATABASE_URL ||
  fs.readFileSync(process.env.DATABASE_URL_FILE, 'utf8');
  //fs.readFileSync() reads a file synchronously
  

const pool = new Pool({
  connectionString: databaseUrl,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); //exits with an error code (-1)
});

const getDateTime = async () => {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT NOW() as now;'); //SQL command to get the current time from PostgreSQL
      //client.query returns a Promise that resolves with a Result object (res)
      return res.rows[0]; //[{ "now": "2024-02-17T12:34:56.789Z" }]
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.release();
    }
  };
  
  module.exports = { getDateTime };