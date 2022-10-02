import List from '@mui/material/List';
import NestedFolderList from './NestedFolderList';

const Directory = ({ folders, handlePlaylistSelect }) => {
  return (
    <List
      sx={{ borderRight: '2px solid grey', flexBasis: '15%', overflow: 'clip' }}
      component='nav'
      aria-labelledby='nested-sub-header'
      subheader='Playlists'
    >
      {folders.map((folder, index) => {
        return <NestedFolderList
          name={folder.name}
          items={folder.items}
          handlePlaylistSelect={handlePlaylistSelect}
          key={index}
        />;
      })}
    </List>
  );
};

export default Directory;