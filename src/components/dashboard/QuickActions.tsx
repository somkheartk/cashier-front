import React from 'react';
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Badge
} from '@mui/material';
import { Speed } from '@mui/icons-material';
import Link from 'next/link';
import { QuickAction } from '@/types/dashboard';

interface QuickActionsProps {
  actions: QuickAction[];
  loading: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions, loading }) => {
  return (
    <Paper elevation={2} sx={{
      p: 4,
      borderRadius: 3,
      background: 'white',
      border: '1px solid #e0e0e0'
    }}>
      <Typography variant="h5" sx={{
        fontWeight: 'bold',
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: '#2E7D32'
      }}>
        <Speed sx={{ color: '#2E7D32' }} />
        เมนูหลัก
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 2
      }}>
        {actions.map((item, index) => (
          <Box key={index}>
            <Link href={item.href} style={{ textDecoration: 'none' }}>
              <Card sx={{
                background: item.color,
                color: 'white',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: item.primary ? 160 : 140,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                border: item.primary ? '3px solid #2E7D32' : 'none',
                boxShadow: item.primary ? '0 4px 20px rgba(46, 125, 50, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: item.primary ? '0 8px 30px rgba(46, 125, 50, 0.4)' : '0 8px 25px rgba(0,0,0,0.15)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1))',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                },
                '&:hover::before': {
                  opacity: 1
                }
              }}>
                <CardContent sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                  p: 2
                }}>
                  {item.badge && (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <Box />
                    </Badge>
                  )}

                  <Box sx={{ mb: 1 }}>
                    {React.cloneElement(item.icon, { sx: { fontSize: 32 } } as any)}
                  </Box>

                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    mb: 0.5,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    fontSize: '0.8rem'
                  }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
