import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PetsSharp } from "@mui/icons-material";

export const Header = () => {
  return(
    <AppBar position='static'>
      <Toolbar>
        <Box display='flex' alignItems='center'>
          <PetsSharp sx={{mr: 1}}/>
          <Typography variant="h6" component={Link} to='/' sx={{textDecoration: 'none', color: 'inherit'}}>Cats Blog</Typography>
        </Box>
        <Box ml='auto'>
          <Button color="inherit" component={Link} to='/login'>Вход</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};