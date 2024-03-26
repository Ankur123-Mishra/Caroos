import { Button, Popover, Typography } from '@mui/material';
import React from 'react'

function PopOverCardMobile({text}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
         <div>
      <Button aria-describedby={id} variant="outlined" className='border' sx={{padding:'0', fontSize:'8px', color:'rgba(0, 0, 0, 0.6)'}} onClick={handleClick}>
        description
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
    <p id='services-info' dangerouslySetInnerHTML={{ __html: text }}/>
        </Typography>
      </Popover>
    </div>
    </>
  )
}

export default PopOverCardMobile