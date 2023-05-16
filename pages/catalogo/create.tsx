import { useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { Done, ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { LayoutAuth } from '@/components';
import inventarioApi from '@/api/inventarioApi';
import { jwt } from '@/utils';

type FormData = {
  id: string;
  name: string;
};


const CreateProduct = () => {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const onRegisterForm = async ({ id, name }: FormData) => {

    setShowError(false);
    setShowSuccess(false);
    setShowMessage("");

    try {
      const { data } = await inventarioApi.post('/product/create', { id, name });
      setShowMessage(data.message);
    } catch (error: any) {
      console.log(error);
      setShowMessage(error.response.data.message);
      setShowError(true);
      return;
    }

    setShowSuccess(true);

    setTimeout(() => {
      const destination = router.query.p?.toString() || '/catalogo';
      setShowSuccess(false);
      router.replace(destination);
    }, 3000);

  }

  return (
    <LayoutAuth title={'Crear Producto'}>
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
              <Typography variant='h2' component="h2">Crear producto</Typography>
              <Chip
                label={showMessage}
                color="error"
                icon={<ErrorOutline />}
                sx={{ display: showError ? 'flex' : 'none' }}
              />
              <Chip
                label={showMessage}
                color="success"
                icon={<Done />}
                sx={{ display: showSuccess ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="ID"
                variant="outlined"
                fullWidth
                {...register('id', {
                  required: 'Este campo es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                error={!!errors.id}
                helperText={errors.id?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre del producto"
                variant="outlined"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                Crear
              </Button>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </form>
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

export default CreateProduct