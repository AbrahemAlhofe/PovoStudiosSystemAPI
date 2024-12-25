import { getAudioDurationInSeconds } from './ffprobe/index.js';

const url = 'https://codahosted.io/docs/k8PrTrf47v/blobs/bl-UdeMKz1zwh/8762ec9ec7b4df7554c31bdff7dd257049150659bc677aa3b60b3973051aed4bf7665e2a78028456528a97a8db4261398936a8c3b7b382ce641c3aa87223058e0fc24f711486aedff2d021fe9689649ec71d5eca3715bb0fe60293c2e4ff4ef8accd7888?codaUse=preview';

getAudioDurationInSeconds(url).then(console.log);