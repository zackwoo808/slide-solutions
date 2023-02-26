const sql = require('./db');

async function addPlaylist(userId, title) {
  try {
    // const response = await sql `
    //   select exists(select p.title
    //   from public.playlists as p
    //   where p.user_id=${userId} AND p.title='Library') AS "libraryExists"
    // `;

    // const { libraryExists } = Array.isArray(response) ? response[0] : {};
    // if (!libraryExists) {
    //   await sql`
    //     insert into public.playlists (user_id, title)
    //     values (${userId}, 'Library')
    //   `;
    // }

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
