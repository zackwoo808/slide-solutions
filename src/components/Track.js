import { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Track = ({ name, musicKey, BPM, runtime, index, moveListItem, onClick }) => {
  // // useDrag - the list item is draggable
  // const [{ isDragging }, dragRef] = useDrag({
  //   type: 'item',
  //   item: { index },
  //   collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //   }),
  // })

  // // useDrop - the list item is also a drop area
  // const [spec, dropRef] = useDrop({
  //   accept: 'item',
  //   hover: (item, monitor) => {
  //       const dragIndex = item.index
  //       const hoverIndex = index
  //       const hoverBoundingRect = ref.current?.getBoundingClientRect()
  //       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
  //       const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

  //       // if dragging down, continue only when hover is smaller than middle Y
  //       if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
  //       // if dragging up, continue only when hover is bigger than middle Y
  //       if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

  //       moveListItem(dragIndex, hoverIndex)
  //       item.index = hoverIndex
  //   },
  // })

  // // Join the 2 refs together into one (both draggable and can be dropped on)
  // const ref = useRef(null)
  // const dragDropRef = dragRef(dropRef(ref))

  // // Make items being dragged transparent, so it's easier to see where we drop them
  // const opacity = isDragging ? 0 : 1
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <ListItem /* ref={dragDropRef} */>
      <ListItem /* style={{ opacity }} */ className="app__track" sx={{
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(0, 0, 0, 0.25)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
        fontWeight: '700',
      }}>
        <p style={{ flexBasis: '20%' }}>{ name }</p>
        <p style={{ flexBasis: '20%', textAlign: 'center' }}>{ runtime }</p>
        <p style={{ flexBasis: '20%', textAlign: 'center' }}>{ BPM }</p>
        <p style={{ flexBasis: '20%', textAlign: 'center' }}>{ musicKey }</p>
        <IconButton aria-label="more info" onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Download</MenuItem>
        <MenuItem onClick={handleClose}>Share</MenuItem>
      </Menu>
      </ListItem>
    // </ListItem>
  );
}

export default Track;