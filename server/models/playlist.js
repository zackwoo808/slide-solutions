const { mergeWith, union } = require('lodash');

const RegExes = {
  FOLDER_STRUCTURE: /([^/])+/g
}

function directoryModel(tracks) {
  if (!Array.isArray(tracks)) {
    return {};
  }

  const directory = tracks.reduce((finalModel, track) => {
    const { folderstructure } = track;
    const levels = folderstructure.match(RegExes.FOLDER_STRUCTURE);
    const folders = [];

    levels.reduce((prevDir, currDir, index, arr) => {
      if (index === arr.length - 1) {
        prevDir.push({
          key: currDir,
          title: currDir,
          tracks: [track]
        });

        return prevDir[0].tracks;
      }

      prevDir.push({
        key: currDir,
        title: currDir,
        content:  []
      });
      return prevDir[0].content;
    }, folders);

    return mergeWith(finalModel, folders, (a, b, propertyName) => {
      if (propertyName === 'tracks') {
        return union(a, b);
      }
    });
  }, []);

  return directory;
}

module.exports = {
  directoryModel
};