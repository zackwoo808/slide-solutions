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
        { folderstructure: '/level1/track1', title: 'track1', musickey: 'C#min', BPM: '91', creators: '@yoshithedino, @nadav.wav' },
        { folderstructure: '/level1/track2', title: 'track2', musickey: 'Amaj', BPM: '120', creators: '@yoshithedino, @nadav.wav' },
      ];
      const result = directoryModel(data);
      const expectedResult = {
        level1: [
          { folderstructure: '/level1/track1', title: 'track1', musickey: 'C#min', BPM: '91', creators: '@yoshithedino, @nadav.wav' },
          { folderstructure: '/level1/track2', title: 'track2', musickey: 'Amaj', BPM: '120', creators: '@yoshithedino, @nadav.wav' },
        ]
      };

      expect(result).toEqual(expectedResult);
    });
  });
});