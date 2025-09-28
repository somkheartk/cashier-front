import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { OrderStatusCounts } from '@/types/orders';

interface OrderStatusCardsProps {
  statusCounts: OrderStatusCounts;
}

export default function OrderStatusCards({ statusCounts }: OrderStatusCardsProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
      <Box>
        <Card elevation={2} sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold">
              {statusCounts.pending}
            </Typography>
            <Typography variant="body1">
              รอดำเนินการ
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold">
              {statusCounts.preparing}
            </Typography>
            <Typography variant="body1">
              กำลังเตรียม
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold">
              {statusCounts.ready}
            </Typography>
            <Typography variant="body1">
              พร้อมเสิร์ฟ
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card elevation={2} sx={{ bgcolor: 'grey.400', color: 'grey.contrastText' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold">
              {statusCounts.completed}
            </Typography>
            <Typography variant="body1">
              สำเร็จ
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
