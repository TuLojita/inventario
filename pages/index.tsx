
import { AuthContext } from '@/context/auth';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';

const HomePage = () => {

  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <Box>
      <Typography>
        Hola Mundo
      </Typography>
    </Box>
  )
}

export default HomePage