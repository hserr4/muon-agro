'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import {
  Dashboard,
  People,
  Agriculture,
  Inventory,
  PointOfSale,
  AccountBalance,
  Notifications,
  Settings,
  Logout,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

const DRAWER_WIDTH = 280;

const menuItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/' },
  { label: 'Animais', icon: <Agriculture />, path: '/animals' },
  { label: 'Funcionários', icon: <People />, path: '/employees' },
  { label: 'Pastagens', icon: <Agriculture />, path: '/fields' },
  { label: 'Estoque', icon: <Inventory />, path: '/stock' },
  { label: 'Vendas', icon: <PointOfSale />, path: '/sales' },
  { label: 'Financeiro', icon: <AccountBalance />, path: '/cashflow' },
];

const bottomItems = [
  { label: 'Notificações', icon: <Notifications />, path: '/notifications' },
  { label: 'Configurações', icon: <Settings />, path: '/settings' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Muon Agro
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <List sx={{ flex: 1, px: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={pathname === item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.light' },
                    '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{ px: 1, borderTop: 1, borderColor: 'divider' }}>
          {bottomItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: 'error.main',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}