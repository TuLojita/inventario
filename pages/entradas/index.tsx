import { LayoutAuth } from "@/components"
import { Box, Card, CardActionArea, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

function createData(
  id: string,
  name: string,
  quantity: number,
) {
  return { id, name, quantity };
}

const rows = [
  createData('0001', "Harina Saco", 5),
  createData('0002', "Harina Kilo", 25),
  createData('0003', "Harina Pan Paca", 50),
  createData('0004', "Harina Pan Kilo", 158),
  createData('0005', "Levadura Kilo", 30),
];

const EntradasPage = () => {

  return (
    <LayoutAuth title="Entradas">
      <Box
        sx={{
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        <Card
          sx={{
            width: '100%',
            backgroundColor: "#2196f3",
          }}
        >
          <CardContent>
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
                #216400
              </Typography>
              <Typography
                gutterBottom
                color="white"
              >
                14/05/2023 - 11:28
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
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '100%',
            backgroundColor: "#2196f3",
          }}
        >
          <CardContent>
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
                #216400
              </Typography>
              <Typography
                gutterBottom
                color="white"
              >
                14/05/2023 - 11:28
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
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '100%',
            backgroundColor: "#2196f3",
          }}
        >
          <CardContent>
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
                #216400
              </Typography>
              <Typography
                gutterBottom
                color="white"
              >
                14/05/2023 - 11:28
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
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '100%',
            backgroundColor: "#2196f3",
          }}
        >
          <CardContent>
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
                #216400
              </Typography>
              <Typography
                gutterBottom
                color="white"
              >
                14/05/2023 - 11:28
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
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LayoutAuth>
  )
}

export default EntradasPage