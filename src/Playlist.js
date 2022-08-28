import React, { useState, useCallback } from 'react'
import Track from './Track'

const TRACKS = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'fish' },
  { id: 4, name: 'hamster' },
]

const Playlist = () => {
  const [tracks, setTracks] = useState(TRACKS)

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
      <ul className="app__playlist">{tracks.map((track, index) => (
        <Track
            key={track.id}
            index={index}
            text={track.name}
            moveListItem={moveTrackListItem}
        />
    ))}
    </ul>
  )
}

export default Playlist;