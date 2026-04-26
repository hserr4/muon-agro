'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  Agriculture,
  Inventory,
  PointOfSale,
  AccountBalance,
} from '@mui/icons-material';

const stats = [
  { title: 'Total de Animais', value: '1.247', icon: <Agriculture />, trend: { value: 12, label: 'desde o último mês' } },
  { title: 'Lotes Ativos', value: '8', icon: <Agriculture />, trend: { value: 3, label: 'novos lotes' } },
  { title: 'Receita (Mês)', value: 'R$ 142.500', icon: <PointOfSale />, trend: { value: 28, label: 'vs mês anterior' } },
  { title: 'Custo por Cabeça', value: 'R$ 312', icon: <AccountBalance />, trend: { value: -8, label: 'vs média' } },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visão geral da sua fazenda
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Movimento do Rebanho
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Gráfico de movimento (em breve)
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Atividades Recentes
            </Typography>
            {[
              { title: 'Pesagem - Lote A12', time: 'Há 2 horas', type: 'success' },
              { title: 'Vacinação - Lote B5', time: 'Há 5 horas', type: 'info' },
              { title: 'Movimentação - Lote C3', time: 'Ontem', type: 'warning' },
              { title: 'Compra de ração', time: 'Há 2 dias', type: 'error' },
            ].map((activity, index) => (
              <Box
                key={index}
                sx={{
                  py: 1.5,
                  borderBottom: index < 3 ? 1 : 0,
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {activity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.time}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}