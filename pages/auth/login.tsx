import { useState, useContext } from 'react';
import NextLink from 'next/link';

import { Box, Button, Chip, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import { AuthContext } from '@/context/auth';
import { Layout } from '@/components';


type FormData = {
  identity: string,
  password: string,
};


const LoginPage = () => {

  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLoginUser = async ({ identity, password }: FormData) => {

    setShowError(false);
    setLoading(true);

    const isValidLogin = await loginUser(identity, password);

    if (!isValidLogin) {
      setShowError(true);
      setLoading(false);
      setTimeout(() => setShowError(false), 3000);
      return;
    }



    // Todo: navegar a la pantalla que el usuario estaba
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);

  }


  return (
    <Layout title="Login">
      <form
        onSubmit={handleSubmit(onLoginUser)}
        noValidate
      >
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  sx={{ display: showError ? 'flex' : 'none' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="mumber"
                  label="Cédula"
                  variant="outlined"
                  fullWidth
                  {...register('identity', {
                    required: 'Este campo es requerido',
                  })}
                  error={!!errors.identity}
                  helperText={errors.identity?.message}
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type='password'
                  variant="outlined"
                  fullWidth
                  {...register('password', {
                    required: 'Este campo es requerido',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid item xs={12}>
                {
                  !loading ? (
                    <Button
                      type="submit"
                      color="primary"
                      size='large'
                      variant='contained'
                      fullWidth>
                      Entrar
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )
                }
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </Layout>
  )
}

export default LoginPage