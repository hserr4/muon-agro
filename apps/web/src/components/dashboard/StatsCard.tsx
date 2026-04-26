'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MoreVert } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  sx?: SxProps<Theme>;
}

export function StatsCard({ title, value, icon, trend, sx }: StatsCardProps) {
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              '& svg': { fontSize: 24 },
            }}
          >
            {icon}
          </Box>
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        {trend && (
          <Typography
            variant="body2"
            sx={{
              color: trend.value >= 0 ? 'success.main' : 'error.main',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {trend.value >= 0 ? '+' : ''}{trend.value}%
            <Typography variant="body2" color="text.secondary">
              {trend.label}
            </Typography>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}