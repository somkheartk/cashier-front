'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AttachMoney,
  People,
  Inventory,
  MoreVert,
  Refresh,
  FilterList,
  Print as PrintIcon,
  Download as DownloadIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/AdminLayout';

const mockTopProducts = [
  { name: 'เอสเพรสโซ', sold: 245, revenue: 36750 },
  { name: 'คาปูชิโน่', sold: 198, revenue: 31680 },
  { name: 'เค้กช็อกโกแลต', sold: 156, revenue: 23400 },
  { name: 'แซนด์วิช', sold: 134, revenue: 20100 },
  { name: 'มัฟฟิน', sold: 89, revenue: 13350 },
];

export default function ReportsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    trend, 
    trendValue, 
    color 
  }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: 'up' | 'down';
    trendValue: string;
    color: string;
  }) => (
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
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                สินค้าขายดี
              </Typography>
              <IconButton onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>อันดับ</TableCell>
                    <TableCell>ชื่อสินค้า</TableCell>
                    <TableCell align="right">จำนวนขาย</TableCell>
                    <TableCell align="right">รายได้</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTopProducts.map((product, index) => (
                    <TableRow key={product.name}>
                      <TableCell>
                        <Chip 
                          label={index + 1} 
                          color={index < 3 ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.sold}</TableCell>
                      <TableCell align="right">
                        ฿{product.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Refresh sx={{ mr: 2 }} />
            รีเฟรชข้อมูล
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <FilterList sx={{ mr: 2 }} />
            กรองข้อมูล
          </MenuItem>
        </Menu>
      </Container>
    </AdminLayout>
  );
}
