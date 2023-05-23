import { GetServerSideProps } from 'next';
import { LayoutAuth } from "@/components"
import { Box, Card, CardContent, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { jwt } from '@/utils';
import { IEntry } from '@/interfaces';
import { Add, Delete } from '@mui/icons-material';

function createData(
  id: string,
  name: string,
  quantity: number,
) {
  return { id, name, quantity };
}

interface Props {
  dataEntries: IEntry[];
}

const EntradasPage = ({ dataEntries }: Props) => {

  const rows = [
    createData('0001', "Harina Saco", 5),
    createData('0002', "Harina Kilo", 25),
    createData('0003', "Harina Pan Paca", 50),
    createData('0004', "Harina Pan Kilo", 158),
    createData('0005', "Levadura Kilo", 30),
  ];

  return (
    <LayoutAuth title="Entradas">
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            left: "0",
            padding: '16px',
            width: '100%',
            display: "flex",
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          <Fab color='error' variant="extended">
            <Delete sx={{ mr: 1 }} />
            Eliminar
          </Fab>
          <Fab color='primary' variant="extended">
            <Add sx={{ mr: 1 }} />
            Crear
          </Fab>
        </Box>
        <Box
          sx={{
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            gap: "8px",
          }}
        >
          {
            dataEntries.length > 0
              ? (
                dataEntries.map(entry => (
                  <Card
                    key={entry.bill}
                    sx={{
                      maxWidth: '700px',
                      width: "100%",
                      backgroundColor: "#2196f3",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "16px !important"
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h5"
                          color="white"
                        >
                          #{entry.bill}
                        </Typography>
                        <Typography
                          gutterBottom
                          color="white"
                        >
                          {entry.date}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: 'white',
                          borderRadius: '6px'
                        }}
                      >
                        <TableContainer elevation={0} component={Paper}>
                          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ width: '160px' }}>ID</TableCell>
                                <TableCell sx={{ flex: 1 }}>Nombre</TableCell>
                                <TableCell sx={{ width: '160px' }}>Cantidad</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {entry.products.map((product) => (
                                <TableRow
                                  key={product.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell>{product.id}</TableCell>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell>{product.quantity}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography textAlign="center">
                  No hay datos para mostrar
                </Typography>
              )
          }
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

  const resEntries = await fetch("http://localhost:3000/api/entry");
  const dataEntries = await resEntries.json();

  return {
    props: {
      dataEntries
    }
  }
}

export default EntradasPage