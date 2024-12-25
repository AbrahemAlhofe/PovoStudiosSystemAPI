import express from 'express';
import { parseWebStream } from 'music-metadata';

const app = express();

app.use(express.json());

async function getAudioDurationInSeconds(url) {

  const response = await fetch(url);
  const mimeType = response.headers.get('content-type');
  const webStream = response.body;
  const metadata = await parseWebStream(webStream, mimeType);

  return metadata.format.duration;

}

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
    res.send({ durations: 0, error: error.message });
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