import express from 'express';
import { getAudioDurationInSeconds } from '../ffprobe/index.js';

const app = express();

app.use(express.json());

app.post('/api/duration/all', async (req, res) => {
  try {
    const { urls } = req.body;
    let durations = 0;
    for (let url of urls) {
      const duration = await getAudioDurationInSeconds(url)
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
    const duration = await getAudioDurationInSeconds(url)
    res.send({ duration });
  } catch (error) {
    res.send({ duration: 0, error: error.message });
  }
});

export default app;