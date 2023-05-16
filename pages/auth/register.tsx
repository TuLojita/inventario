import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { Done, ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/auth';
import { Layout } from '@/components';

type FormData = {
  name: string;
  identity: string;
  password: string;
};


const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext);


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const onRegisterForm = async ({ name, identity, password }: FormData) => {

    setShowError(false);
    setShowMessage("");
    const { hasError, message } = await registerUser(identity, name, password);
    
    if (hasError) {
      setShowError(true);
      setShowMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setShowSuccess(true);

    setTimeout(() => {
      const destination = router.query.p?.toString() || '/';
      setShowSuccess(false);
      router.replace(destination);
    }, 3000);

  }

  return (
    <Layout title={'Registrar'}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
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
              <Typography variant='h1' component="h1">Crear cuenta</Typography>
              <Chip
                label={showMessage}
                color="error"
                icon={<ErrorOutline />}
                sx={{ display: showError ? 'flex' : 'none' }}
              />
              <Chip
                label="Usuario creado correctamente"
                color="success"
                icon={<Done />}
                sx={{ display: showSuccess ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="outlined"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
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
              <Button
                type="submit"
                color="primary"
                size='large'
                variant='contained'
                fullWidth
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </form>
    </Layout>
  )
}

export default RegisterPage