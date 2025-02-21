const cors = require('cors'); //allow cross-origin requests from frontend
const { getDateTime } = require('./db');
const express = require('express') //Dockerfile will install this dependency with npm install, reading package.json and package-lock.json
const app = express()
const port = process.env.PORT || 3000;

app.use(cors()); // enable CORS for all requests

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//HOME ****
app.get('/', async (req, res) => {
  const dateTime = await getDateTime();
  const response = dateTime;
  res.send(response);
  //res.json(response); // Send response as JSON cause react doesn't like object with keys
});

//PING ****
app.get('/ping', async (_, res) => {
  res.send('pong');
});

  