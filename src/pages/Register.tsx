import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootStore } from "../app/store";
import { Controller, useForm } from "react-hook-form";
import { setUser } from "../features/auth/authSlice";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface RegisterForm {
  email: string;
  password: string;
}

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      dispatch(setUser({ uid: user.uid, email: user.email }));
      navigate("/");

    } catch(err: any) {
      alert(`Ошбика: ${err.message}`)
    }
    
  };

   return (
    <Box p={2} maxWidth={400} mx="auto">
      <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Введите email" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Введите пароль", minLength: {value: 6, message: 'Пароль должен содержать минимум 6 символов'}}}
          render={({ field }) => (
            <TextField
              {...field}
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>Зарегестрироваться</Button>
      </form>
    </Box>
  );
};
