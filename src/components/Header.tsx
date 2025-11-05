import { Box, Typography, AppBar, Toolbar, Button, Tooltip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AddCircleOutline, Login, Logout, PersonAdd, PetsSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { RootStore } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { auth } from "../firebase";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootStore) => state.auth.isAuth);
  const user = useSelector((state: RootStore) => state.auth.user);

  const hendleLogout = async () => {
    try{
      await auth.signOut();
      dispatch(logout())
    }catch (err: any) {
      console.error('Ошибка входа:', err.message)
    }
  }
  return (
    <AppBar position="sticky" sx={{top: 0, zIndex: 1100}}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <PetsSharp sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Cats Blog
          </Typography>
        </Box>

        
          <Box sx={{display: {
            xs: 'none', sm: 'flex'
          }, alignItems: 'center', gap: 1}}>
       
          {isAuth ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                Привет, {user?.email || "User"}!
              </Typography>
              <Button color="inherit" component={Link} to='/create'>
                Создать пост
              </Button>
              
              <Button color="inherit" onClick={hendleLogout}>
                Выход
              </Button>
            </>
          ) : (
            <><Button color="inherit" component={Link} to="/login">
              Вход
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Регистрация
            </Button></>
          )}
        </Box>
        <Box sx={{display: {
          xs: 'flex', sm: 'none'
        }, alignItems: 'center', gap: 0.5}}>
          {isAuth ? (
            <>
              
              <Tooltip title='Создать пост'>
               <IconButton color="inherit" component={Link} to='/create'>
               <AddCircleOutline/>
               </IconButton>
              </Tooltip>
              <Tooltip title='Выход'>
               <IconButton color="inherit" onClick={hendleLogout}>
               <Logout/>
               </IconButton>
              </Tooltip>
              
            </>
          ) : (
            <>
            <Tooltip title='Вход'>
               <IconButton color="inherit" component={Link} to="/login">
               <Login/>
               </IconButton>
              </Tooltip>
            <Tooltip title='Регистрация'>
               <IconButton color="inherit" component={Link} to="/register">
               <PersonAdd/>
               </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
        
        
      </Toolbar>
    </AppBar>
  );
};
