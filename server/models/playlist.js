const { isArray, mergeWith } = require('lodash');

const RegExes = {
  FOLDER_STRUCTURE: /([^/])+/g
}

function directoryModel(tracks) {
  if (!Array.isArray(tracks)) {
    return {};
  }

  const directory = tracks.reduce((finalDirectory, track) => {
    const { folderstructure, title } = track;
    const levels = folderstructure.match(RegExes.FOLDER_STRUCTURE);
    const folders = {};

    levels.reduce((prevDir, currDir, index, arr) => {
      if (index === arr.length - 1) {
        prevDir.push(track);

        return prevDir;
      }

      if (index === arr.length - 2) {
        Object.assign(prevDir, { [currDir]:  [] });

        return prevDir[currDir];
      }

      Object.assign(prevDir, { [currDir]:  {} });
      return prevDir[currDir];
    }, folders);

    return mergeWith({}, finalDirectory, folders, (a, b) => {
      if (isArray(a)) {
        return a.concat(b);
      }
    });
  }, {});

  console.log(directory);
  return directory;
}

module.exports = {
  directoryModel
};