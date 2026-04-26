'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              Muon Agro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Faça login para continuar
            </Typography>
          </Box>

          <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="seu@email.com"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              placeholder="••••••••"
              variant="outlined"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Esqueceu a senha?
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{ mb: 2, py: 1.5 }}
            >
              Entrar
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ou
              </Typography>
            </Divider>

            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Não tem conta?{' '}
              <Link href="/register" style={{ color: '#7C3AED' }}>
                Criar conta
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}