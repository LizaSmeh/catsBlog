import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootStore } from "../app/store";
import { Controller, useForm } from "react-hook-form";
import { login } from "../features/auth/authSlice";

interface LoginForm {
  username: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state: RootStore) => state.auth.isAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    if (data.username === "liza" && data.password === "qwerty") {
      dispatch(login({ username: data.username }));
      navigate("/");
    } else {
      alert("Неверный логин или пароль");
    }
  };

  if (isAuth) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Вы уже авторизованы
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Вернуться на главную
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2} maxWidth={400} mx="auto">
      <Typography variant="h4" gutterBottom>
        Вход
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{ required: "Введите имя пользователя" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Имя пользователя"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Введите пароль" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Пароль"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>Войти</Button>
      </form>
    </Box>
  );
};
