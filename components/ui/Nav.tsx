import { useContext, useState } from "react";

import { AccountCircle, BarChart, ListAlt, Logout, Menu as MenuIcon, Person, PersonAdd, SystemUpdateAlt } from "@mui/icons-material"
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, ListItemIcon, ListItemText, Divider } from "@mui/material"
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
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="menu"
            anchorEl={anchorMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorMenu)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                router.push("/entradas")
              }}
              disableRipple
            >
              <ListItemIcon>
                <SystemUpdateAlt fontSize="small" />
              </ListItemIcon>
              <ListItemText>Entradas</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu} disableRipple>
              <ListItemIcon>
                <SystemUpdateAlt fontSize="small" sx={{ rotate: '180deg' }} />
              </ListItemIcon >
              <ListItemText>Salidas</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu} disableRipple>
              <ListItemIcon>
                <BarChart fontSize="small" />
              </ListItemIcon>
              <ListItemText>Movimientos</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu()
                router.push("/catalogo")
              }}
              disableRipple
            >
              <ListItemIcon>
                <ListAlt fontSize="small" />
              </ListItemIcon>
              <ListItemText>Catálogo</ListItemText>
            </MenuItem>
          </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CSII
        </Typography>
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
              <ListItemText>{ user?.name }</ListItemText>
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
