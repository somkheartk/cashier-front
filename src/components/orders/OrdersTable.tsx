import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Order, OrderItem } from '@/types/orders';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  getStatusColor: (status: Order['status']) => 'warning' | 'info' | 'success' | 'default' | 'error';
  getStatusText: (status: Order['status']) => string;
}

export default function OrdersTable({ orders, onViewOrder, getStatusColor, getStatusText }: OrdersTableProps) {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>รหัสออเดอร์</strong></TableCell>
            <TableCell><strong>ลูกค้า</strong></TableCell>
            <TableCell><strong>โต๊ะ</strong></TableCell>
            <TableCell><strong>จำนวนรายการ</strong></TableCell>
            <TableCell align="right"><strong>ยอดรวม</strong></TableCell>
            <TableCell><strong>สถานะ</strong></TableCell>
            <TableCell><strong>เวลา</strong></TableCell>
            <TableCell align="center"><strong>การดำเนินการ</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>
                <Typography fontWeight="medium">#{order.id}</Typography>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body1">{order.customerName}</Typography>
                  {order.customerPhone !== '-' && (
                    <Typography variant="body2" color="textSecondary">
                      {order.customerPhone}
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {order.tableNumber && (
                  <Chip label={order.tableNumber} size="small" variant="outlined" />
                )}
              </TableCell>
              <TableCell>{order.items.length} รายการ</TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">฿{order.total.toLocaleString()}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusText(order.status)}
                  color={getStatusColor(order.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {format(order.createdAt, 'HH:mm:ss')}
              </TableCell>
              <TableCell align="center">
                <Box display="flex" gap={1} justifyContent="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onViewOrder(order)}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <PrintIcon />
                  </IconButton>
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <IconButton size="small" color="info">
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
