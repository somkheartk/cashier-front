import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  LinearProgress
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { StatData } from '@/types/dashboard';

interface StatsCardProps {
  stat: StatData;
  index: number;
  loading: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stat, index, loading }) => {
  return (
    <Card elevation={2} sx={{
      borderRadius: 3,
      background: 'white',
      border: '1px solid #e0e0e0',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      position: 'relative',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Avatar sx={{
            bgcolor: stat.color,
            width: 56,
            height: 56,
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}>
            {stat.icon}
          </Avatar>

          <Box sx={{ textAlign: 'right' }}>
            {stat.trend === 'up' ? (
              <TrendingUp sx={{ color: '#4CAF50', fontSize: 20 }} />
            ) : (
              <TrendingDown sx={{ color: '#f44336', fontSize: 20 }} />
            )}
            <Chip
              label={stat.change}
              size="small"
              sx={{
                ml: 1,
                bgcolor: stat.change.includes('+') ? '#E8F5E8' : '#FFEBEE',
                color: stat.change.includes('+') ? '#2E7D32' : '#C62828',
                fontWeight: 'bold'
              }}
            />
          </Box>
        </Box>

        <Typography variant="h4" sx={{
          fontWeight: 'bold',
          color: '#333',
          mb: 1
        }}>
          {stat.value}
        </Typography>

        <Typography variant="body2" sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          mb: 2
        }}>
          {stat.label}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinearProgress
            variant="determinate"
            value={stat.progress}
            sx={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: stat.color,
                borderRadius: 4
              }
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 35 }}>
            {stat.progress.toFixed(0)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
