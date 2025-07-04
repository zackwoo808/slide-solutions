// #region app setup
const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('multer');
const { Readable } = require('stream');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const {
  getTrack,
  getTrackStream,
  getAllPlaylists,
  getAllPlaylistTracks,
} = require('./lib/stream');
const { addPlaylist, deletePlaylist } = require('./lib/playlist');
const { createTrackEntry, uploadTrack } = require('./lib/upload');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors({
    origin: ['http://localhost:3000', 'https://slide-solutions.surge.sh', 'http://slide-solutions.surge.sh']
}));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// #endregion

// #region public API setup
app.get('/api/welcome-message', (req, res) => {
  res.json({
    message: 'Your music production network. All on one platform.'
  });
});
// #endregion

// #region private API setup
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.SERVER_ENDPOINT,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
});

app.get('/private-test', checkJwt, (req, res) => {
  res.json('hi');
});

app.post('/playlists/add', checkJwt, async (req, res) => {
  const { body: { title } } = req;
  const userId = req?.auth?.payload?.sub;

  try {
    await addPlaylist(userId, title);
    const updatedPlaylists = await getAllPlaylists(userId);

    res
      .status(200)
      .json({ playlists: updatedPlaylists })
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err);
  }
});

app.post('/playlists/delete', checkJwt, async (req, res) => {
  const { body: { title } } = req;
  const userId = req?.auth?.payload?.sub;

  try {
    await deletePlaylist(userId, title);
    const updatedPlaylists = await getAllPlaylists(userId);

    res
      .status(200)
      .json({ playlists: updatedPlaylists })
  } catch (err) {
    res
      .status(err.status || 500)
      .json(err);
  }
});


app.get('/playlists', checkJwt, async (req, res) => {
  const userId = req?.auth?.payload?.sub;

  try {
    const playlists = await getAllPlaylists(userId);
    res
      .status(200)
      .json({
        playlists
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

app.get('/playlists/:playlistId/tracks', checkJwt, async (req, res) => {
  const { playlistId } = req.params;

  try {
    const tracks = await getAllPlaylistTracks(playlistId);
    res
      .status(200)
      .json(tracks);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

app.get('/audio/:trackKey', (req, res) => {
  const { params: { trackKey } } = req;

  getTrackStream(trackKey, (err, response) => {
    if (err || !response) {
      console.log(err);
      return res
        .status(500)
        .json(err);
    }

    const {
      Body,
      ContentLength: contentLength,
      ContentType: contentType,
    } = response;
  
    const range = req.headers.range || '0';
    const chunkSize = 1 * 1e6;  //  1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, contentLength - 1);

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${contentLength}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': contentType,
    };
    res.writeHead(206, headers);

    const stream = Readable.from(Body);
    stream.pipe(res);
  });
});

app.get('/download/:trackKey', checkJwt, async (req, res) => {
  const promise = new Promise((resolve, reject) => {
    const { params: { trackKey } } = req;
    getTrack(trackKey, (err, response) => {
      if (err || !response) {
        console.log(err);
        return reject(err);
      }

      const {
        Body,
        ContentLength: contentLength,
        ContentType: contentType,
      } = response;
    
      resolve({ data: Body, contentType, contentLength });
    });
  });

  promise
    .then(({ data, contentType, contentLength }) => {
      res.writeHead(206, {
        'Content-Length': contentLength,
        'Content-Type': contentType,
      });
      
      const stream = Readable.from(data);
      stream.pipe(res);
    })
    .catch (err => res
      .status(500)
      .json(err));
});

app.post('/upload', checkJwt, fileUpload().single('file'), (req, res) => {
  const { body: { title, creators, genre, key, BPM, type, playlistId }, file } = req;
  const userId = req?.auth?.payload?.sub;

  uploadTrack(file, async (err, response) => {
    if (err || !response) {
      return res
        .status(500)
        .json(err);
    }

    try {
      const dbResponse = await createTrackEntry({
        userId,
        s3Key: file.originalname,
        title,
        BPM,
        creators,
        musicKey: key,
        genre,
        type,
        playlistId 
      });

      res
        .status(dbResponse.status)
        .json({
          status: 201,
          msg: 'Success Created',
          data: dbResponse.tracks
        });
    } catch (err) {
      return res
      .status(500)
      .json({
        msg: err
      });
    }
  });
});
// #endregion

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
