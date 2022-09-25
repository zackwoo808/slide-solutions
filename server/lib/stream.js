const { s3Client } = require('./s3Client');
const { GetObjectCommand, ListObjectsV2Command, ListObjectsCommand } = require('@aws-sdk/client-s3');

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

async function getAllTracks(trackName) {
  const command = new ListObjectsCommand({
    Bucket: BUCKET_NAME
  });

  let response;
  try {
    return await s3Client.send(command);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getTrack,
  getAllTracks,
};