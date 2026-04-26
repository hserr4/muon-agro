'use client';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

const DRAWER_WIDTH = 280;

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader />
      <AppSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${DRAWER_WIDTH}px`,
          mt: '64px',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}