import { useContext, useState } from "react";

import { AccountCircle, BarChart, ListAlt, Logout, Menu as MenuIcon, Person, PersonAdd, SystemUpdateAlt } from "@mui/icons-material"
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, ListItemIcon, ListItemText, Divider, Button } from "@mui/material"
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";

export const Nav = () => {

  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          gap: '32px'
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "32px"
          }}
        >
          <Button
            variant={router.pathname === "/entradas" ? "outlined" : "text"}
            color="inherit"
            startIcon={<SystemUpdateAlt />}
            onClick={() => {
              router.push("/entradas")
            }}
          >Entradas</Button>
          <Button
            color="inherit"
            startIcon={<SystemUpdateAlt sx={{ rotate: '180deg' }} />}
            onClick={() => {
              router.push("/entradas")
            }}
          >Salidas</Button>
          <Button
            color="inherit"
            startIcon={<BarChart />}
            onClick={() => {
              router.push("/entradas")
            }}
          >Movimientos</Button>
          <Button
            variant={router.pathname === "/catalogo" ? "outlined" : "text"}
            color="inherit"
            startIcon={<ListAlt />}
            onClick={() => {
              router.push("/catalogo")
            }}
          >Catálogo</Button>
        </Box>
        <Box>
          <IconButton
            size="large"
            aria-controls="profile"
            aria-haspopup="true"
            onClick={handleProfile}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="profile"
            anchorEl={anchorProfile}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorProfile)}
            onClose={handleCloseProfile}
          >
            <MenuItem
              disabled
              sx={{
                padding: '8px 16px'
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>{user?.name}</ListItemText>
            </MenuItem>
            <Divider />
            {
              user?.role === "admin" && (
                <MenuItem
                  onClick={() => {
                    handleCloseProfile()
                    router.push("/auth/register")
                  }}
                  disableRipple
                >
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Crear usuario</ListItemText>
                </MenuItem>
              )
            }
            <MenuItem
              onClick={() => {
                handleCloseProfile()
                logout()
              }}
              disableRipple
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cerrar Sesión</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
