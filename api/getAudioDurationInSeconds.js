import readAudioHeader from './readAudioHeader.js';

export default async function getAudioDurationInSeconds(url) {
        
    let { bitrate, numberOfChannels, duration, container, codecProfile, size, mimeType } =  await readAudioHeader(url);

    if ( container === "MPEG" && codecProfile === "CBR" ) duration = ( size * 8 ) / ( bitrate );
    
    if ( container === "WAVE" && numberOfChannels === 1 ) duration = ( size * 8 ) / ( bitrate * numberOfChannels );
  
    return duration
  
}