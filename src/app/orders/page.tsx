"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Grid,
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Receipt as ReceiptIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { apiService } from '@/services/api';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  tableNumber?: string;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: 1001,
    customerName: 'คุณสมชาย',
    customerPhone: '081-234-5678',
    items: [
      { id: 1, name: 'กาแฟเย็น', price: 30, quantity: 2 },
      { id: 2, name: 'ข้าวผัดกุ้ง', price: 120, quantity: 1 },
    ],
    total: 180,
    status: 'preparing',
    createdAt: new Date(),
    tableNumber: 'A1',
  },
  {
    id: 1002,
    customerName: 'คุณสมหญิง',
    customerPhone: '089-876-5432',
    items: [
      { id: 3, name: 'ส้มตำ', price: 25, quantity: 1 },
      { id: 4, name: 'น้ำมะนาว', price: 20, quantity: 2 },
    ],
    total: 65,
    status: 'ready',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    tableNumber: 'B3',
  },
  {
    id: 1003,
    customerName: 'Walk-in Customer',
    customerPhone: '-',
    items: [
      { id: 5, name: 'ชาเย็น', price: 25, quantity: 3 },
      { id: 6, name: 'ขนมปัง', price: 15, quantity: 2 },
    ],
    total: 105,
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'preparing': return 'info';
    case 'ready': return 'success';
    case 'completed': return 'default';
    case 'cancelled': return 'error';
    default: return 'default';
  }
};

const getStatusText = (status: Order['status']) => {
  switch (status) {
    case 'pending': return 'รอดำเนินการ';
    case 'preparing': return 'กำลังเตรียม';
    case 'ready': return 'พร้อมเสิร์ฟ';
    case 'completed': return 'สำเร็จ';
    case 'cancelled': return 'ยกเลิก';
    default: return status;
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  // Count orders by status
  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          จัดการออเดอร์
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewOrderDialogOpen(true)}
        >
          สร้างออเดอร์ใหม่
        </Button>
      </Box>

      {/* Status Cards */}
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

      {/* Filters */}
      <Box mb={3} display="flex" gap={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>สถานะ</InputLabel>
          <Select
            value={filterStatus}
            label="สถานะ"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">ทั้งหมด</MenuItem>
            <MenuItem value="pending">รอดำเนินการ</MenuItem>
            <MenuItem value="preparing">กำลังเตรียม</MenuItem>
            <MenuItem value="ready">พร้อมเสิร์ฟ</MenuItem>
            <MenuItem value="completed">สำเร็จ</MenuItem>
            <MenuItem value="cancelled">ยกเลิก</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          placeholder="ค้นหาออเดอร์..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      {/* Orders Table */}
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
            {filteredOrders.map((order) => (
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
                      onClick={() => handleViewOrder(order)}
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

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          รายละเอียดออเดอร์ #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">ลูกค้า</Typography>
                  <Typography variant="body1" fontWeight="medium">{selectedOrder.customerName}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">เบอร์โทร</Typography>
                  <Typography variant="body1">{selectedOrder.customerPhone}</Typography>
                </Box>
                {selectedOrder.tableNumber && (
                  <Box>
                    <Typography variant="body2" color="textSecondary">โต๊ะ</Typography>
                    <Typography variant="body1">{selectedOrder.tableNumber}</Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="body2" color="textSecondary">สถานะ</Typography>
                  <Chip 
                    label={getStatusText(selectedOrder.status)} 
                    color={getStatusColor(selectedOrder.status)}
                    size="small"
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="h6" gutterBottom>รายการสินค้า</Typography>
              <List dense>
                {selectedOrder.items.map((item, index) => (
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
                  ฿{selectedOrder.total.toLocaleString()}
                </Typography>
              </Box>

              {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
                <Box mt={3}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    อัพเดทสถานะ
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {selectedOrder.status === 'pending' && (
                      <Button 
                        variant="outlined" 
                        color="info"
                        size="small"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'preparing')}
                      >
                        เริ่มเตรียม
                      </Button>
                    )}
                    {selectedOrder.status === 'preparing' && (
                      <Button 
                        variant="outlined" 
                        color="success"
                        size="small"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'ready')}
                      >
                        พร้อมเสิร์ฟ
                      </Button>
                    )}
                    {selectedOrder.status === 'ready' && (
                      <Button 
                        variant="outlined" 
                        color="primary"
                        size="small"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'completed')}
                      >
                        เสร็จสิ้น
                      </Button>
                    )}
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                    >
                      ยกเลิก
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>ปิด</Button>
          <Button variant="contained" startIcon={<PrintIcon />}>
            พิมพ์
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Order Dialog */}
      <Dialog open={newOrderDialogOpen} onClose={() => setNewOrderDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>สร้างออเดอร์ใหม่</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" color="textSecondary">
              ฟีเจอร์นี้จะพัฒนาในเวอร์ชันถัดไป...
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewOrderDialogOpen(false)}>ยกเลิก</Button>
          <Button variant="contained">สร้างออเดอร์</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
