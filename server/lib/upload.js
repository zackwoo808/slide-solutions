const { s3Client } = require('./s3Client');
const sql = require('./db');

function uploadTrack(file, cb) {
  try {
    return s3Client.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: 'audio/mpeg',
    }, cb);
  } catch (err) {
    console.log(new Error(err));
    cb(err, null);
  }
}

async function createTrackEntry(opts) {
  const { userId, s3Key, title, BPM, creators, musicKey, genre, type, playlistId } = opts || {};
  try {
    await sql`
      insert into public.tracks (user_id, s3_key, title, bpm, creators, music_key, genre, type) 
      values (${userId}, ${s3Key}, ${title}, ${BPM}, ${creators}, ${musicKey}, ${genre}, ${type})
    `;

    let trackId = await sql`
      select track_id
      from public.tracks as t
      where t.user_id = ${userId} and t.s3_key = ${s3Key} 
    `;

    trackId = trackId[0]?.track_id;

    await sql`
      insert into public.playlist_to_track (track_id, playlist_id) 
      values (${trackId}, ${playlistId})
    `;

    return {
      status: 201
    };
  } catch (err) {
    console.log(new Error(err));
    throw new Error(err)
  }
}

module.exports = {
  createTrackEntry,
  uploadTrack,
};
