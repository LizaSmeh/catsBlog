import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PetsSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { RootStore } from "../app/store";
import { logout } from "../features/auth/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootStore) => state.auth.isAuth);
  const user = useSelector((state: RootStore) => state.auth.user);
  return (
    <AppBar position="sticky" sx={{top: 0, zIndex: 1100}}>
      <Toolbar>
        <Box display="flex" alignItems="center">
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
        <Box ml="auto">
          {isAuth ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                Привет, {user}!
              </Typography>
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Выход
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Вход
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
