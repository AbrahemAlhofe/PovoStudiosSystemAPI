import express from 'express';
import readAudioHeader from './readAudioHeader.js';
import getAudioDurationInSeconds from './getAudioDurationInSeconds.js';

const app = express();

app.use(express.json());

app.post('/api/duration', async (req, res) => {
  try {
    const { urls } = req.body;
    let durations = 0;
    for (let url of urls) durations += await getAudioDurationInSeconds(url);
    res.send({ durations });
  } catch (error) {
    res.send({ durations: 0, error: error.message });
  }
});

// api/sample-rate/
app.post('/api/sample-rate', async (req, res) => {
  try {
    const { url } = req.body;
    const { sampleRate } = await readAudioHeader(url);
    res.send({ sampleRate });
  } catch (error) {
    res.send({ sampleRate: 0, error: error.message });
  }
});

// api/bitrate/
app.post('/api/bitrate', async (req, res) => {
  try {
    const { url } = req.body;
    const { bitrate } = await readAudioHeader(url);
    res.send({ bitrate });
  } catch (error) {
    res.send({ bitrate: 0, error: error.message });
  }
});

// api/channels
app.post('/api/channels', async (req, res) => {
  try {
    const { url } = req.body;
    const { numberOfChannels } = await readAudioHeader(url);
    res.send({ channels: numberOfChannels });
  } catch (error) {
    res.send({ channels: 0, error: error.message });
  }
});

export default app;