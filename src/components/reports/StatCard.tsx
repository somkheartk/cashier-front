import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendValue: string;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  color
}: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {trend === 'up' ? (
                <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} fontSize="small" />
              ) : (
                <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} fontSize="small" />
              )}
              <Typography
                variant="body2"
                color={trend === 'up' ? 'success.main' : 'error.main'}
              >
                {trendValue}
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}
