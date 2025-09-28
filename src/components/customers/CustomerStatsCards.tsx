import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { CustomerStats } from '@/types/customers';

interface CustomerStatsCardsProps {
  stats: CustomerStats;
  formatCurrency: (amount: number) => string;
}

export default function CustomerStatsCards({ stats, formatCurrency }: CustomerStatsCardsProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, gap: 3, mb: 3 }}>
      <Box>
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {stats.total}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ลูกค้าทั้งหมด
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: '#fafafa' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#cd7f32' }}>
              {stats.bronze}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              สมาชิกบรอนซ์
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: '#f5f5f5' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#c0c0c0' }}>
              {stats.silver}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              สมาชิกซิลเวอร์
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: '#fffacd' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#ffd700' }}>
              {stats.gold}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              สมาชิกโกลด์
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(stats.avgSpent)}
            </Typography>
            <Typography variant="body2">
              ค่าใช้จ่ายเฉลี่ย
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
