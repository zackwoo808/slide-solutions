describe('playlist', () => {
  const playlist = require('../playlist');

  describe('directoryModel', () => {
    const { directoryModel } = playlist;

    it('should return an empty object if data is not an array', () => {
      const data = [undefined, null, false, {}, '', 'string', 1];
      const expectedResult = {};

      data.forEach(item => expect(directoryModel(item)).toEqual(expectedResult));
    });

    it('should return a nested directory from a filepath (Happy Path)', () => {
      const data = [
        {
          bpm: "84",
          folderstructure: "Personal/Alt-Indie",
          creators: "@Davwave,@Yoshithedino,@itsjessemason",
          playlist: "Alt-Indie",
          title: "Keep",
          musickey: "Cmin",
          key: "Alt-Indie/02",
        },
        {
          bpm: "91",
          folderstructure: "Personal/Alt-Indie",
          creators: "@ayeitgroh, @nadav.wav",
          playlist: "Alt-Indie",
          title: "HYU",
          musickey: "D#min",
          key: "Alt-Indie/09 - HYU @ayeitgroh x @nadav.wav D#min BPM91 2M.mp3",
        },
      ];
      const result = directoryModel(data);
      const expectedResult = [
        {
          name: 'Personal',
          items: [
            {
              name: 'Starred',
              playlists: [
                {
                  id: 1,
                  name: 'Alt-Indie',
                  BPM: 81,
                  musicKey: "B Maj",
                  creator: "@yxshimusic,@nadav",
                  tracks: [
                    {
                      bpm: "84",
                      folderstructure: "Personal/Alt-Indie",
                      creators: "@Davwave,@Yoshithedino,@itsjessemason",
                      playlist: "Alt-Indie",
                      title: "Keep",
                      musickey: "Cmin",
                      key: "Alt-Indie/02",
                    },
                    {
                      bpm: "91",
                      folderstructure: "Personal/Alt-Indie",
                      creators: "@ayeitgroh, @nadav.wav",
                      playlist: "Alt-Indie",
                      title: "HYU",
                      musickey: "D#min",
                      key: "Alt-Indie/09 - HYU @ayeitgroh x @nadav.wav D#min BPM91 2M.mp3",
                    },
                  ]
                }
              ]
            }
          ]
        }
      ];

      expect(result).toEqual(expectedResult);
    });
  });
});