import { describe, it, expect } from 'vitest';
import getAudioDurationInSeconds from './api/getAudioDurationInSeconds';

describe('getAudioDurationInSeconds', () => {
  it('should return the correct duration for FLAC (2:24)', async () => {
    const url = 'https://codahosted.io/docs/k8PrTrf47v/blobs/bl-WrskZ3mQUS/571f14d8ae0e19e3fb32ded00c8d61406227fd7fdd8161e2c4385b84bea712c1ae9e8d8eef8ead50f71959afd4ed035b093ca68291c9e7c3da66da2e58909b7f50c4c6dd785378b8a33945855c0e5f0f36d0f96fbec3032d7b0e6b090d112715c49a97d0';
    const expectedDuration = 144; // 2:24 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });

  it('should return the correct duration for the second URL (3:12)', async () => {
    const url = 'https://codahosted.io/docs/k8PrTrf47v/blobs/bl-5qh0o27eZP/4a45c107de62101655b7505212f23541c46db467b4863663c68ace45e7670dba6afd078e01a2747f07cb1f50fc49c30c7ea661d58afab5f8400e8b1144670160659da03fde127b56eddb564486b9411dbcc041641af40c5486bc7ab8dae7cd4e922722bf';
    const expectedDuration = 192; // 3:12 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });

  it('should return the correct duration for the third URL (12:12)', async () => {
    const url = 'https://codahosted.io/docs/k8PrTrf47v/blobs/bl-V5FfCIeEtC/28a0999d3a74d7b78995c4a65ae7f32a994ffbd94b86dbd7ef1d3eb35529488034224ce15a63170b34144340e3204f1a009402e7264e7a6022bb58bcc8beddced8e573cb4fa496fc2bfa854cbdf5affc4aeac4148037cf45a80ce1773bfd9d8686e048d4?codaUse=preview';
    const expectedDuration = 732; // 12:12 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });

  it('should return the correct duration for the fourth URL (4:00)', async () => {
    const url = 'https://codahosted.io/docs/k8PrTrf47v/blobs/bl-xQ3xBSBaBt/5b46f7c02812ab21ea7ea2734733309414c311c2b20cda148489d28a6965198f94f40770b3de6e5b27cbd178913a9db51af63141bb45dc6c7092502c70a0ebb09f1fdaa403edc3ed2b3fe7027ff66a771049441234f664344731eae958774d54a3820e07?codaUse=preview';
    const expectedDuration = 240; // 4:00 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });

  it('should return the correct duration for the fifth URL (3:12)', async () => {
    const url = 'https://codahosted.io/docs/ukq18oL8TI/blobs/bl-fQRU6Ye5eS/e86a2ee6f90990eb5d5042ab95f628d9855cee7bfc0b84a1b212c32c51f2e4f484e437885452875131ab417a8ed21a5a4153ceaccaf1a173993cc3d2a84f5c2688044fe4ae9fac0503c40f11555a58184ee1f3b9e4b7ffd62005d2e792e21f6e20eac8a5?codaUse=preview';
    const expectedDuration = 192; // 2:24 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });

  it('should return the correct duration for the sixth URL (5:01)', async () => {
    const url = 'https://diviextended.com/wp-content/uploads/2021/10/sound-of-waves-marine-drive-mumbai.mp3';
    const expectedDuration = 301; // 5:01 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });


  it('should return the correct duration for the sixth URL (00:27)', async () => {
    const url = 'https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3';
    const expectedDuration = 27; // 00:27 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });

  
  it('should return the correct duration for the sixth URL (5:48)', async () => {
    const url = 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3';
    const expectedDuration = 350; // 5:48 in seconds
    const duration = await getAudioDurationInSeconds(url);
    expect(Math.floor(duration)).toBe(expectedDuration);
  });
});