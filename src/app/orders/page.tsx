"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { OrderStatusCards, OrdersTable, OrderDetailsDialog, NewOrderDialog } from '@/components/orders';
import { Order, OrderItem } from '@/types';
import { apiService } from '@/services/api';

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Load orders from API
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await apiService.getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = useMemo(() => orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  ), [orders, filterStatus]);

  // Count orders by status
  const statusCounts = useMemo(() => ({
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }), [orders]);

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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <OrderStatusCards statusCounts={statusCounts} />
      )}

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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <OrdersTable
          orders={filteredOrders}
          onViewOrder={handleViewOrder}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      )}

      {/* View Order Dialog */}
      <OrderDetailsDialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateOrderStatus}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
      />

      {/* New Order Dialog */}
      <NewOrderDialog
        open={newOrderDialogOpen}
        onClose={() => setNewOrderDialogOpen(false)}
      />
    </Box>
  );
}
