const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors')


const app = express();
app.use(cors())
app.get('/codechef', (req, res) => {
  const username = 'YOUR_NAME';
  const password = 'YOUR_PASSWORD';

  axios.post('https://www.codechef.com/login', {
    name: username,
    pass: password
  })
  .then(response => {
    const cookie = response.headers['set-cookie'][0].split(';')[0];
    axios.get(`https://www.codechef.com/users/${username}`, {
      headers: {
        Cookie: cookie
      }
    })
    .then(response => {
      const $ = cheerio.load(response.data);
      const ratings = $('div.rating-number').text().trim();
      const contestsJoined = $('div.contest-participated-count > b').text().trim();
      res.send({ ratings, contestsJoined });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch data' });
    });
  })
  .catch(error => {
    console.error(error);
    res.status(401).json({ error: 'Invalid username or password' });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
