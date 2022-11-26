const cors = require('cors');
const express = require('express');
const path = require('path');
const { Readable } = require('stream');

const {
  getTrack,
  getTrackStream,
  getAllPlaylists,
  getAllPlaylistTracks,
} = require('./lib/stream');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors({
    origin: ['http://localhost:3000', 'https://slide-solutions.surge.sh', 'http://slide-solutions.surge.sh']
}));

app.get('/api/welcome-message', (req, res) => {
  res.json({ message: 'welcome home, homie!' });
});

app.get('/playlists/:userId', async (req, res) => {
  const { userId } = req.params;
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

app.get('/playlists/:playlistId/tracks', async (req, res) => {
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

app.get('/download/:trackKey', async (req, res) => {
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
