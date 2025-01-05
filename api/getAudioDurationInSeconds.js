import { parseBuffer } from 'music-metadata';

export default async function getAudioDurationInSeconds(url) {
  const response = await fetch(url, { headers: { Range: 'bytes=0-65535' } });
  
  if (!response.ok && response.status !== 206) {
    throw new Error(`Failed to fetch audio header from ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = response.headers.get('content-type');

  const metadata = await parseBuffer(buffer, mimeType, { duration: true });

  const { bitrate, numberOfChannels, sampleRate, bitsPerSample, duration, container, codecProfile } = metadata.format;
  const size = Number(response.headers.get("content-range").split("/")[1]);
  const isMpegVbr = container === "MPEG" && codecProfile === "V2";
  
  if ( container === "FLAC" || isMpegVbr ) return duration;

  return ( size * 8 ) / ( bitrate * numberOfChannels );

}