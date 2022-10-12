import { AppBar, Box, Fab, Toolbar,Typography,Button,IconButton,Avatar} from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom';


export default function NavBar() {
  const loginpage = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const LogoutHandler = () =>{
    localStorage.removeItem("userdetails");
    loginpage("/")
  }
  return (
    <AppBar position="sticky">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="div"
            // sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Button onClick={LogoutHandler} sx={{marginLeft:'15px'}} variant='contained'>Logout</Button>

          {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,marginLeft:'100px'}} >
            <Avatar alt="Remy Sharp" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
          </IconButton> */}

          {/* <Fab variant="extended" color="primary" aria-label="add">
          <Avatar alt="Remy Sharp" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
          Extended
          </Fab> */}

        </Toolbar>
    </AppBar>
  )
}
