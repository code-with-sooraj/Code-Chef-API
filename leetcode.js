const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/leetcode', async (req, res) => {
  const username = req.query.username || 'saurav4648';  // Fetch username from query parameters

  try {
    const response = await axios.get(`https://leetcode.com/${username}/`);
    const $ = cheerio.load(response.data);
    
    // Adjust selectors based on the actual structure of the LeetCode profile page
    const rating = $('.rating-selector').text().trim();  // Example selector
    const problemsSolved = $('.problems-solved-selector').text().trim();  // Example selector

    if (!rating || !problemsSolved) {
      res.status(404).json({ error: 'User data not found or incorrect selectors' });
    } else {
      res.json({ rating, problemsSolved });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
