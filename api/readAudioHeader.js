import { parseBuffer } from 'music-metadata';

/**
 * 
 * @param {string} url
 * @returns {
 *   bitrate: number,
 *   numberOfChannels: number,
 *   duration: number,
 *   container: string,
 *   codecProfile: string,
 *   size: number,
 *   sampleRate: number,
 *   mimeType: string
 * }
 */
export default async function readAudioHeader(url) {
  const response = await fetch(url, { headers: { Range: 'bytes=0-65535' } });
  
  if (!response.ok && response.status !== 206) {
    throw new Error(`Failed to fetch audio header from ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = response.headers.get('content-type');
  const metadata = await parseBuffer(buffer, mimeType, { duration: true });
  const size = Number(response.headers.get("content-range").split("/")[1]);

  return {
    ...metadata.format,
    size,
    mimeType
  }

}