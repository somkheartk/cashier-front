import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Chip,
  Box
} from '@mui/material';
import { Receipt } from '@mui/icons-material';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'completed' | 'pending';
  time: string;
}

interface RecentOrdersProps {
  orders: Order[];
  loading: boolean;
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, loading }) => {
  return (
    <Paper elevation={2} sx={{
      p: 3,
      borderRadius: 3,
      background: 'white',
      border: '1px solid #e0e0e0'
    }}>
      <Typography variant="h6" sx={{
        fontWeight: 'bold',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: '#1976D2'
      }}>
        <Receipt sx={{ color: '#1976D2' }} />
        ออเดอร์ล่าสุด
      </Typography>

      <List sx={{ p: 0 }}>
        {orders.map((order, index) => (
          <ListItem key={index} sx={{
            px: 0,
            py: 1.5,
            borderBottom: index < orders.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none'
          }}>
            <ListItemAvatar>
              <Avatar sx={{
                bgcolor: order.status === 'completed' ? '#4CAF50' : '#FF9800',
                width: 40,
                height: 40
              }}>
                <Receipt sx={{ fontSize: 20 }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {order.id}
                  </Typography>
                  <Chip
                    label={order.status === 'completed' ? 'สำเร็จ' : 'รอดำเนินการ'}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      bgcolor: order.status === 'completed' ? '#E8F5E8' : '#FFF3E0',
                      color: order.status === 'completed' ? '#2E7D32' : '#E65100'
                    }}
                  />
                </Box>
              }
              secondary={
                <span>
                  <Typography variant="body2" color="text.secondary" component="span">
                    {order.customer}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" component="span" sx={{ display: 'block' }}>
                    {order.time}
                  </Typography>
                </span>
              }
            />
            <ListItemSecondaryAction>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                ฿{order.total.toLocaleString()}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
