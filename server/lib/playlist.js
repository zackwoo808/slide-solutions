const sql = require('./db');

async function addPlaylist(userId, title) {
  try {
    await sql`
      insert into public.playlists (user_id, title)
      values (${userId}, ${title})
    `;

    return {
      status: 200
    };
  } catch (err) {
    console.log(new Error(err));
    return {
      status: 404,
      err
    };
  }
}

async function deletePlaylist(userId, title) {
  try {
    await sql`
      DELETE FROM public.playlists WHERE user_id=${userId} AND title=${title}
    `;

    return {
      status: 200
    };
  } catch (err) {
    console.log(new Error(err));
    return {
      status: 404,
      err
    };
  }
}

module.exports = {
  addPlaylist,
  deletePlaylist,
};
