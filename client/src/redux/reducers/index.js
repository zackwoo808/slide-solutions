const initialState = {
  activePlaylist: [],
  currentPlaylists: [],
  currentTrackIndex: 0,
  currentTracks: [],
  isPlayerDisabled: true,
  isPlaying: false,
  isTrackLastClicked: false,
  welcomeMessage: '',
  playlists: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_PLAYER_DISABLED':
      return {
        ...state,
        isPlayerDisabled: action.isPlayerDisabled,
      };
    case 'TOGGLE_PLAYER_PLAYING':
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case 'SET_WELCOME_MESSAGE':
      return {
        ...state,
        welcomeMessage: action.message,
      };
    case 'UPDATE_ACTIVE_PLAYLIST':
      return {
        ...state,
        activePlaylist: action.data,
      };
    case 'UPDATE_CURRENT_PLAYLISTS':
      return {
        ...state,
        currentPlaylists: action.data,
      };
    case 'UPDATE_CURRENT_TRACK_INDEX':
      return {
        ...state,
        currentTrackIndex: action.index,
      };
    default:
      return state;
  }
}