import { useContext, useState, ChangeEvent, useEffect } from 'react';

import { ProductsContext } from "@/context/entry";

import { Close } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from 'dayjs';
import { Box, FormControl, FormLabel, TextField, Autocomplete, Select, MenuItem, IconButton, SelectChangeEvent } from "@mui/material"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { inventarioApi } from '@/api';
import { IProduct } from '@/interfaces';

interface custonProduct {
  _id: string;
  label: string;
  clasification: string;
  description: string;
  min: number;
  max: number;
  current: number;
}

interface Props {
  names: IProduct[];

  id: string;
}

const temporalOptions: custonProduct[] = [
  {
    _id: '',
    label: "cargando opciones...",
    clasification: "",
    description: "",
    min: 0,
    max: 0,
    current: 0
  }
]

export const Product = ({ names, id }: Props) => {

  const { deleteEntry, productsUpdate, setValidID } = useContext(ProductsContext);

  // Estados
  const [nameValue, setNameValue] = useState<custonProduct | null>(null);
  const [category, setCategory] = useState('none');
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [idError, setIdError] = useState(false);
  const [message, setMessage] = useState("");
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    bill: "",
    startDate: "",
    quantity: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let changeValues = productData;
    changeValues.name = nameValue?.label!;
    setProductData(changeValues);
    updateContext();
  }, [nameValue]);


  useEffect(() => {
    updateContext();
  }, [productData]);

  const updateContext = () => {
    productsUpdate(productData, id);
  }

  useEffect(() => {
    const validateId = async () => {
      setIdError(false);
  
      console.log(productData.id)
      
      if(productData.id !== "") {
        try {
          await inventarioApi.get(`/product/exist/${productData.id}`);
          setIdError(false);
          setMessage("");
          setValidID({error: false, message: ""});
        } catch (error: any) {
          console.log({error: error});
          setIdError(true);
          setMessage(error.response.data.message);
        }
      }
    }

    validateId();
  }, [productData.id]);

  useEffect(() => {
    setValidID({
      error: true,
      message: `la ID de producto ${productData.id} ya esta en uso`
    });
  }, [idError]);

  return (
    <Box
      sx={{
        width: '100%',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        backgroundColor: '#f8fafc',
        paddingTop: '40px',
        position: 'relative'
      }}
    >
      <IconButton
        color="error"
        sx={{
          position: 'absolute',
          top: '4px',
          right: '4px'
        }}
        onClick={() => deleteEntry(id)}
      >
        <Close />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '16px'
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            maxWidth: '110px',
            width: '100%'
          }}
        >
          <FormLabel htmlFor="id">ID</FormLabel>
          <TextField
            id="id"
            placeholder="Ej: 216400"
            name="id"
            onChange={handleChange}
            error={idError}
            helperText={idError ? message : ""}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            flex: 1
          }}
        >
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Autocomplete
            value={nameValue!}
            onChange={(event: any, newValue: custonProduct | null) => {
              setNameValue(newValue);
            }}
            options={names.length > 0 ? names : temporalOptions}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                key={option._id}
              >
                {option.label} ({option.clasification})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                }}
                placeholder='Ej: Ibuprofeno'
                sx={{
                  backgroundColor: 'white'
                }}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '16px'
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            minWidth: '220px',
            width: "100%",
          }}
        >
          <FormLabel htmlFor="description">Presentación</FormLabel>
          <TextField
            id="description"
            placeholder="Ej: 10 capsulas 600g"
            defaultValue={nameValue?.description!}
            name="description"
            onChange={handleChange}
            multiline
            minRows={4}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '16px'
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            width: '100%'
          }}
        >
          <FormLabel htmlFor="use">Uso</FormLabel>
          <TextField
            id="use"
            placeholder="Ej: Antialergico"
            name="use"
            onChange={handleChange}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            minWidth: '200px'
          }}
        >
          <FormLabel htmlFor="quantity">Cantidad</FormLabel>
          <TextField
            id="quantity"
            type="number"
            placeholder="Ej: 6"
            name="quantity"
            defaultValue={0}
            onChange={handleChange}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            minWidth: '200px'
          }}
        >
          <FormLabel htmlFor="unit-cost">C. Unitario</FormLabel>
          <TextField
            id="unit-cost"
            type="number"
            placeholder="Ej: $12,00"
            name="unitCost"
            defaultValue={0}
            onChange={handleChange}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            minWidth: '200px'
          }}
        >
          <FormLabel htmlFor="total-cost">C. Total</FormLabel>
          <TextField
            id="total-cost"
            type="number"
            placeholder="Ej: $120,00"
            name="totalCost"
            defaultValue={0}
            onChange={handleChange}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            minWidth: '240px'
          }}
        >
          <FormLabel>F. Vence</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{
                backgroundColor: 'white'
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </Box>
  )
}
