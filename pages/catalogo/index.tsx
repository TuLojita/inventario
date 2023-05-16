import inventarioApi from "@/api/inventarioApi";
import { LayoutAuth } from "@/components";
import { IProduct } from "@/interfaces";
import { AddOutlined, Delete, Done, ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  dataProducts: IProduct[]
}

const CatalogoHome = ({ dataProducts }: Props) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [delProduct, setDelProduct] = useState("");
  const [delProductError, setDelProductError] = useState(false);
  const [delProductSuccess, setDelProductSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'ID', width: 150, },
    { field: 'col2', headerName: 'Nombre', flex: 1 },
  ];

  const rows: any = [];
  if (Array.isArray(dataProducts)) {
    dataProducts.map(product => {
      rows.push({ id: product.id, col1: product.id, col2: product.name })
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDelProduct("");
  };

  const deleteProduct = async () => {

    setDelProductError(false);
    setDelProductSuccess(false);
    setShowMessage("");

    try {
      const { data } = await inventarioApi.delete(`/product/delete?id=${delProduct}`);
      setDelProductSuccess(true);
      setShowMessage(data.message);

      setTimeout(() => {
        setDelProductSuccess(false);
        handleClose();
        router.reload();
      }, 3000);
    } catch (error: any) {
      console.log(error);
      setDelProductError(true);
      setShowMessage(error.response.data.message);
      setTimeout(() => {
        setDelProductError(false);
      }, 3000);
    }
  }

  return (
    <LayoutAuth title="Catálogo" >
      <Box
        sx={{
          width: '100%',
          padding: '0px 16px'
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            marginBottom: '24px',
            marginTop: '40px'
          }}
        >
          Catálogo
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'space-between',
            padding: '24px 0'
          }}
        >
          <Button
            startIcon={<Delete />}
            variant="contained"
            color="error"
            size="large"
            onClick={handleClickOpen}
          >
            Eliminar
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Eliminar producto</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Escribe la ID del producto que deseas eliminar.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="id"
                label="Ej: 0003"
                type="text"
                fullWidth
                variant="standard"
                value={delProduct}
                onChange={(e) => setDelProduct(e.target.value)}
              />
              <Chip
                label={showMessage}
                color="error"
                icon={<ErrorOutline />}
                sx={{ display: delProductError ? 'flex' : 'none', marginTop: "16px" }}
              />
              <Chip
                label={showMessage}
                color="success"
                icon={<Done />}
                sx={{ display: delProductSuccess ? 'flex' : 'none', marginTop: "16px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                size="large"
                color="error"
                variant="contained"
                onClick={deleteProduct}
                >Eliminar</Button>
            </DialogActions>
          </Dialog>
          <Button
            startIcon={<AddOutlined />}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              router.push("/catalogo/create")
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </LayoutAuth>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const resProducts = await fetch("http://localhost:3000/api/product");
  const dataProducts = await resProducts.json();

  return {
    props: {
      dataProducts
    }
  }
}

export default CatalogoHome