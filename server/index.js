const express = require('express');
const path = require('path');
const fs = require('fs');
const { getTrack, getAllTracks } = require('./lib/stream');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/welcome-message', (req, res) => {
  res.json({ message: 'welcome home, homie!' });
});

app.get('/audio', async (req, res) => {
  try {
    const tracks = await getAllTracks();
    res
      .status(200)
      .json({
        tracks
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

app.get('/audio/:trackName', async (req, res) => {
  try {
    const { params: { trackName } } = req;
    const response = await getTrack(trackName);

    const {
      Body: stream,
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

    stream.pipe(res);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
