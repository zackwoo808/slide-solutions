import Button from '@mui/material/Button';

const trackInfo = ({ currentTrack = {} }) => {
  const { BPM, creator, musicKey, name } = currentTrack;

  return (
    <div className="app__info">
      <div className="track__info">
         <p>Track name: { name }</p>
         <p>Key: { musicKey }</p>
         <p>BPM: { BPM }</p>
         <p>Creator: { creator }</p>
      </div>
      <Button variant="outlined">Share</Button>
    </div>
 );
}

export default trackInfo;