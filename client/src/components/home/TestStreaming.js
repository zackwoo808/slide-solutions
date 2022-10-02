
const TestStreaming = ({ welcomeMessage, currentTracks }) => {
  return (
    <div className="app__wrap app__flex-column">
    <p>{welcomeMessage}</p>
    <ul>
      {currentTracks?.map(({ title, creators, BPM, musicKey, key }, index) => {
        return (
          <li key={index} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFF' }}>
            <audio controls>
              <source src={`/audio/${encodeURIComponent(key)}`} type="audio/mp3" muted />
              Your browser does not support the audio tag.
            </audio>
            <div>{title}&nbsp;{creators}&nbsp;{BPM}&nbsp;{musicKey}</div>
          </li>
        );
      })}
    </ul>
    </div>
  );
};

export default TestStreaming;