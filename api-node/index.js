//const { getDateTime } = require('./db');
const express = require('express') //Dockerfile will install this dependency with npm install, reading package.json and package-lock.json
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*
app.get('/', async (req, res) => {
    const dateTime = await getDateTime();
    const response = dateTime;
    response.api = 'node';
    res.send(response);
  });
  
  app.get('/ping', async (_, res) => {
    res.send('pong');
  });*/

  