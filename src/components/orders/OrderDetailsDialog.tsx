import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import { Order, OrderItem } from '@/types/orders';

interface OrderDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (orderId: number, newStatus: Order['status']) => void;
  getStatusColor: (status: Order['status']) => 'warning' | 'info' | 'success' | 'default' | 'error';
  getStatusText: (status: Order['status']) => string;
}

export default function OrderDetailsDialog({
  open,
  onClose,
  order,
  onUpdateStatus,
  getStatusColor,
  getStatusText
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        รายละเอียดออเดอร์ #{order.id}
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">ลูกค้า</Typography>
              <Typography variant="body1" fontWeight="medium">{order.customerName}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">เบอร์โทร</Typography>
              <Typography variant="body1">{order.customerPhone}</Typography>
            </Box>
            {order.tableNumber && (
              <Box>
                <Typography variant="body2" color="textSecondary">โต๊ะ</Typography>
                <Typography variant="body1">{order.tableNumber}</Typography>
              </Box>
            )}
            <Box>
              <Typography variant="body2" color="textSecondary">สถานะ</Typography>
              <Chip
                label={getStatusText(order.status)}
                color={getStatusColor(order.status)}
                size="small"
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" gutterBottom>รายการสินค้า</Typography>
          <List dense>
            {order.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`฿${item.price} × ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <Typography fontWeight="bold">
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">ยอดรวม</Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ฿{order.total.toLocaleString()}
            </Typography>
          </Box>

          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <Box mt={3}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                อัพเดทสถานะ
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {order.status === 'pending' && (
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => onUpdateStatus(order.id, 'preparing')}
                  >
                    เริ่มเตรียม
                  </Button>
                )}
                {order.status === 'preparing' && (
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => onUpdateStatus(order.id, 'ready')}
                  >
                    พร้อมเสิร์ฟ
                  </Button>
                )}
                {order.status === 'ready' && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onUpdateStatus(order.id, 'completed')}
                  >
                    เสร็จสิ้น
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onUpdateStatus(order.id, 'cancelled')}
                >
                  ยกเลิก
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ปิด</Button>
        <Button variant="contained" startIcon={<PrintIcon />}>
          พิมพ์
        </Button>
      </DialogActions>
    </Dialog>
  );
}
