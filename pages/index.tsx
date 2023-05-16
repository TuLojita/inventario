import { GetServerSideProps } from 'next';
import { AuthContext } from '@/context/auth';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { jwt } from '@/utils';
import { LayoutAuth } from '@/components';

const HomePage = () => {

  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <LayoutAuth title='Inicio'>
      <Typography>
        Hola Mundo
      </Typography>
    </LayoutAuth>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const { token = '' } = req.cookies;
  let isValidToken = false;

  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  }

  return {
    props: {

    }
  }
}

export default HomePage