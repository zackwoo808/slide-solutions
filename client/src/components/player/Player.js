import PlaybackControls from './PlaybackControls';
import PlaybackSpeedControls from './PlaybackSpeedControls';
import SeekBar from './SeekBar';
import VolumeControls from './VolumeControls';

import '../../stylesheets/Player.css';

export default function Player({ duration, onNext, onPause, onPlay, onPlaybackSpeedChange, onPrev, onSeek, onSeekComplete, onVolumeChange, playbackSpeed, timeElapsed, trackProgress, volumeLevel }) {
  return (
    <div className="player">
      <div className="player__top-controls">
        <SeekBar duration={duration} timeElapsed={timeElapsed} trackProgress={trackProgress} onSeek={onSeek} onSeekComplete={onSeekComplete} />
      </div>
      <div className="player__bottom-controls">
        <VolumeControls onVolumeChange={onVolumeChange} volumeLevel={volumeLevel} />
        <PlaybackControls onNext={onNext} onPause={onPause} onPlay={onPlay} onPrev={onPrev} />
        <PlaybackSpeedControls onPlaybackSpeedChange={onPlaybackSpeedChange} playbackSpeed={playbackSpeed} />
      </div>
    </div >
  );
};
