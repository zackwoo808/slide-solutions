const sql = require('./db');

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
};
