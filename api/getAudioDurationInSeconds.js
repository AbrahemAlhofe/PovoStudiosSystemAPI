import readAudioHeader from './readAudioHeader.js';

export default async function getAudioDurationInSeconds(url) {
        
    const { bitrate, numberOfChannels, duration, container, codecProfile, size } =  await readAudioHeader(url);
  
    if ( container === "MPEG" && codecProfile === "CBR" && numberOfChannels === 1 ) return ( size * 8 ) / ( bitrate * numberOfChannels );
  
    if ( container === "WAVE" && numberOfChannels === 1 ) return ( size * 8 ) / ( bitrate * numberOfChannels );
  
    return duration
  
}