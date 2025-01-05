import express from 'express';
import readAudioHeader from './readAudioHeader.js';

const app = express();

app.use(express.json());

app.post('/api/duration/all', async (req, res) => {
  try {
    const { urls } = req.body;
    let durations = 0;
    for (let url of urls) {
      const { bitrate, numberOfChannels, duration, container, codecProfile, size } =  await readAudioHeader(url);
      const isMpegVbr = container === "MPEG" && codecProfile === "V2";

      if ( container === "FLAC" || isMpegVbr ) durations += duration;
    
      durations += ( size * 8 ) / ( bitrate * numberOfChannels );
    }
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

export default app;