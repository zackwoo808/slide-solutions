const { s3Client } = require('./s3Client');
const sql = require('./db');

function getTrackStream(trackKey, cb) {
  try {
    return s3Client.getObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: trackKey,
      ResponseContentType: 'stream',
      Range: 'bytes=16561-8065611',
    }, cb);
  } catch (err) {
    console.log(new Error(err));
    return {};
  }
}

function getTrack(trackKey, cb) {
  try {
    return s3Client.getObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: trackKey,
    }, cb);
  } catch (err) {
    console.log(new Error(err));
    return {};
  }
}

async function getAllPlaylists(user_id = 2) {
  try {
    const playlists = await sql`
      select *
      from public.playlists as p
      where p.user_id = ${user_id}
    `;

    return playlists;
  } catch (err) {
    console.log(new Error(err));
    return [];
  }
}

async function getAllPlaylistTracks(playlistId) {
  try {
    const playlistTracks = await sql`
      select *
      from public.tracks as t
      join public.playlist_to_track as p2t
      on p2t.track_id = t.track_id and p2t.playlist_id = ${parseInt(playlistId)}
    `;

    return playlistTracks;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getTrack,
  getTrackStream,
  getAllPlaylists,
  getAllPlaylistTracks,
};