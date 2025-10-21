import { Box, Typography, Grid, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootStore } from "../app/store";

export const Footer = () => {
  const toDay = new Date();
  const memes = useSelector((state: RootStore) => state.memes.memes);

  const formatDate = toDay.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const memeOfTheDay = memes[toDay.getDate() % memes.length];
  return (
    <Box
      component="footer"
      py={2}
      bgcolor="primary.main"
      color="white"
      mt="auto"
      textAlign="center"
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h6">Mem toDay</Typography>
          {memeOfTheDay.image && (
            <CardMedia
              component="img"
              image={memeOfTheDay.image}
              alt={memeOfTheDay.text}
              sx={{ height: 100, width: "auto", mx: "auto", mt: 1 }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h6">Дата</Typography>
          <Typography>{formatDate}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h6">Контакты</Typography>
          <Typography>@Lizsurprise</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
