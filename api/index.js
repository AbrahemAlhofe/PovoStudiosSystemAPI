import express from 'express';
import { parseBuffer } from 'music-metadata';

const app = express();

app.use(express.json());

async function getAudioDurationInSeconds(url) {
  const response = await fetch(url, { headers: { Range: 'bytes=0-65535' } });
  
  if (!response.ok && response.status !== 206) {
    throw new Error(`Failed to fetch audio header from ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = response.headers.get('content-type');

  const metadata = await parseBuffer(buffer, mimeType, { duration: true });

  const bitrate = metadata.format.bitrate;
  const numberOfChannels = metadata.format.numberOfChannels;
  const size = Number(response.headers.get("content-range").split("/")[1]);

  return size * 8 / ( bitrate * numberOfChannels );
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