import fetch from 'node-fetch';
import express from 'express';
import getMP3Duration from 'get-mp3-duration';

const app = express();

app.use(express.json());

app.post('/api/duration/all', async (req, res) => {
  try {
    const { urls } = req.body;
    let durations = 0;
    for (let url of urls) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const duration = getMP3Duration(buffer) / 1000
      durations += duration;
    }
    res.send({ durations });
  } catch (error) {
    res.send({ durations: 0 });
  }
});

app.post('/api/duration', async (req, res) => {
  try {
    const url = req.body.url;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const duration = await getMP3Duration(buffer) / 1000
    res.send({ duration });
  } catch (error) {
    res.send({ duration: 0 });
  }
});

app.listen();