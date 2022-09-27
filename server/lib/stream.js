const { GetObjectCommand, ListObjectsCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

const { s3Client } = require('./s3Client');

const BUCKET_NAME = 'slide-solutions-demo';

async function getTrack(trackName) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: trackName,
    ResponseContentType: 'stream',
    Range: 'bytes 16561-8065611',
  });

  let response;
  try {
    return await s3Client.send(command);
  } catch (err) {
    throw new Error(err);
  }
}

async function getTrackMetadata(key) {
  const metadataCommand = new HeadObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key
  });
  const metadata = await s3Client.send(metadataCommand);

  return {
    ...metadata?.Metadata,
    key,
  };
};

async function getAllTracks(trackName) {
  const command = new ListObjectsCommand({
    Bucket: BUCKET_NAME
  });

  let response;
  try {
    const tracks = await s3Client.send(command);
    const promiseArray = tracks?.Contents?.map(track => getTrackMetadata(track.Key));
    const response = await Promise.all(promiseArray);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getTrack,
  getAllTracks,
};