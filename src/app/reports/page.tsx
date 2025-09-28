'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
  Print as PrintIcon,
  Download as DownloadIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/AdminLayout';
import { StatCard, TopProductsTable } from '@/components/reports';

export default function ReportsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            รายงานและสถิติ
          </Typography>
          <Box display="flex" gap={2}>
            <Button variant="outlined" startIcon={<PrintIcon />}>
              พิมพ์รายงาน
            </Button>
            <Button variant="contained" startIcon={<DownloadIcon />}>
              ส่งออกข้อมูล
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 3, 
          mb: 4 
        }}>
          <StatCard
            title="ยอดขายวันนี้"
            value="฿67,500"
            icon={<AttachMoney />}
            trend="up"
            trendValue="+12%"
            color="#1976d2"
          />
          <StatCard
            title="จำนวนออร์เดอร์"
            value="118"
            icon={<ShoppingCart />}
            trend="up"
            trendValue="+8%"
            color="#2e7d32"
          />
          <StatCard
            title="ลูกค้าใหม่"
            value="23"
            icon={<People />}
            trend="down"
            trendValue="-3%"
            color="#ed6c02"
          />
          <StatCard
            title="สินค้าคงเหลือ"
            value="1,245"
            icon={<Inventory />}
            trend="up"
            trendValue="+5%"
            color="#9c27b0"
          />
        </Box>

        {/* Filter Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" startIcon={<DateRangeIcon />} sx={{ minWidth: '200px' }}>
              เลือกช่วงวันที่
            </Button>
          </Box>
        </Paper>

        {/* Summary Cards */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                สรุปรายงาน
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ระบบรายงานและสถิติพร้อมใช้งาน - ข้อมูลการขาย, สินค้า และลูกค้า
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Tables Section */}
        <TopProductsTable
          products={mockTopProducts}
          anchorEl={anchorEl}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
        />
      </Container>
    </AdminLayout>
  );
}
