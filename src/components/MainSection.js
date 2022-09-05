import React, { useState, useCallback } from 'react'
import Directory from './Directory.js';
import List from '@mui/material/List';
import Track from './Track'

const Playlist = ({ userTracks = {} }) => {
  const [tracks, setTracks] = useState(userTracks)

  const moveTrackListItem = useCallback(
    (dragIndex, hoverIndex) => {
        const dragItem = tracks[dragIndex]
        const hoverItem = tracks[hoverIndex]
        // Swap places of dragItem and hoverItem in the tracks array
        setTracks(tracks => {
            const updatedTracks = [...tracks]
            updatedTracks[dragIndex] = hoverItem
            updatedTracks[hoverIndex] = dragItem
            return updatedTracks
        })
    },
    [tracks],
)

  return (
    <div className="app__playlist">
      <Directory />
      <List>
        {tracks.map((track, index) => (
        <Track
            key={track.id}
            index={index}
            name={track.name}
            musicKey={track.musicKey}
            BPM={track.BPM}
            runtime={track.runtime}
            moveListItem={moveTrackListItem}
        />
      ))}
      </List>
    </div>
  )
}

export default Playlist;