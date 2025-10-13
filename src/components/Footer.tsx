import { Box, Typography, Grid } from "@mui/material";
export const Footer = () => {
  const toDay = new Date().toLocaleDateString('ru-RU')
  return (
  <Box component='footer' py={2} bgcolor='primary.main' color='white' mt='auto' textAlign='center'>
    <Grid container spacing={2} justifyContent='center'>
      <Grid size={{xs: 12, sm: 4}} >
        <Typography variant="h6">Mem toDay</Typography>
        <Typography>Mi-mi-mi</Typography>
            
      </Grid>
      <Grid size={{xs: 12, sm: 4}}>
        <Typography variant="h6">Дата</Typography>
        <Typography>{toDay}</Typography>
      </Grid>
      <Grid size={{xs: 12, sm: 4}}>
        <Typography variant="h6">Контакты</Typography>
        <Typography>@Lizsurprise</Typography>
      </Grid>
    </Grid>
  </Box>
  );
};