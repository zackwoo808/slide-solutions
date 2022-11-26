import PlaybackControls from './PlaybackControls';
import PlaybackSpeedControls from './PlaybackSpeedControls';
import SeekBar from './SeekBar';
import VolumeControls from './VolumeControls';

import '../../stylesheets/Player.css';

export default function Player() {
  return (
    <div className="player">
      <div className="player__top-controls">
        <SeekBar />
      </div>
      <div className="player__bottom-controls">
        <VolumeControls />
        <PlaybackControls />
        <PlaybackSpeedControls />
      </div>
    </div >
  );
};
