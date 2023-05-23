import { GetServerSideProps } from 'next';
import { Box, Button, Chip, Fab, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { jwt } from '@/utils';
import { LayoutAuth, Product } from '@/components';
import { Add, RestartAlt } from '@mui/icons-material';
import error from 'next/error';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { Dayjs } from 'dayjs';
import { ProductsContext, AuthContext } from '@/context';

const HomePage = () => {

  const { products, validID, addNewProduct, setBillState, setStartDateState } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);

  console.log(user);

  const [bill, setBill] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  return (
    <LayoutAuth title='Inicio'>
      <Box
        sx={{
          padding: '40px 16px'
        }}
      >
        <Typography
          fontSize={40}
          textAlign="center"
        >Crear Entradas</Typography>
        <Box
          sx={{
            padding: '40px 0',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px'
          }}
        >
          <TextField
            sx={{ maxWidth: '250px', width: '100%', backgroundColor: "white" }}
            label="Número de factura"
            variant="outlined"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{
                backgroundColor: "white",
                maxWidth: '250px',
                width: '100%'
              }}
            />
          </LocalizationProvider>
        </Box>
        <Typography
          textAlign="center"
        >Productos</Typography>
        <Box
          sx={{
            marginTop: '12px',
            borderRadius: "8px",
            padding: '16px',
            backgroundColor: "#64748b",
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              gap: '8px',
            }}
          >
            {
              products.map(entry => (
                <Product
                  key={entry._id}
                  names={controllers!}
                  id={entry._id!}
                  categories={categories}
                />
              ))
            }
            <Fab
              color="inherit"
              onClick={addNewProduct}
            >
              <Add />
            </Fab>
          </Box>
        </Box>
        {
          error && (
            <Box
              sx={{
                marginTop: '24px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Chip
                color="error"
                label={message}
              />
            </Box>
          )
        }
        {
          success && (
            <Box
              sx={{
                marginTop: '24px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Chip
                color="success"
                label={message}
              />
            </Box>
          )
        }
        <Box
          sx={{
            margin: '24px 0',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="warning"
            startIcon={<RestartAlt />}
          >
            Reiniciar
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<Add />}
            onClick={validatedForms}
          >
            Crear entrada
          </Button>
        </Box>
      </Box>
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