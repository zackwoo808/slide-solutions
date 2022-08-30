import Button from '@mui/material/Button';

const trackInfo = () => {
  return (
    <div className="app__info">
      <Button variant="outlined" sx={{
        marginBottom: '5px'
      }}>Upload</Button>
      <Button variant="outlined">Download</Button>
    </div>
 );
}

export default trackInfo;