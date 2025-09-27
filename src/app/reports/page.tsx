"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  DateRange as DateRangeIcon,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { format } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data
const salesData = [
  { date: '2024-09-21', sales: 12500, orders: 45, customers: 32 },
  { date: '2024-09-22', sales: 15200, orders: 52, customers: 38 },
  { date: '2024-09-23', sales: 9800, orders: 38, customers: 28 },
  { date: '2024-09-24', sales: 18600, orders: 64, customers: 45 },
  { date: '2024-09-25', sales: 22100, orders: 78, customers: 56 },
  { date: '2024-09-26', sales: 19800, orders: 69, customers: 51 },
  { date: '2024-09-27', sales: 25400, orders: 89, customers: 62 },
];

const productSalesData = [
  { name: 'กาแฟเย็น', sales: 450, revenue: 13500, percentage: 25 },
  { name: 'ข้าวผัด', sales: 320, revenue: 38400, percentage: 20 },
  { name: 'ส้มตำ', sales: 280, revenue: 7000, percentage: 18 },
  { name: 'น้ำส้ม', sales: 250, revenue: 5000, percentage: 15 },
  { name: 'ผัดไทย', sales: 200, revenue: 16000, percentage: 12 },
  { name: 'อื่นๆ', sales: 150, revenue: 8500, percentage: 10 },
];

const monthlySalesData = [
  { month: 'ม.ค.', sales: 450000, orders: 1800, avgOrder: 250 },
  { month: 'ก.พ.', sales: 420000, orders: 1680, avgOrder: 250 },
  { month: 'มี.ค.', sales: 480000, orders: 1920, avgOrder: 250 },
  { month: 'เม.ย.', sales: 520000, orders: 2080, avgOrder: 250 },
  { month: 'พ.ค.', sales: 580000, orders: 2320, avgOrder: 250 },
  { month: 'มิ.ย.', sales: 620000, orders: 2480, avgOrder: 250 },
];

const topCustomersData = [
  { name: 'คุณสมหญิง รักสะอาด', orders: 45, spent: 28750, lastOrder: '2024-09-27' },
  { name: 'คุณสมชาย ใจดี', orders: 25, spent: 12500, lastOrder: '2024-09-26' },
  { name: 'คุณประยุทธ์ มีเงิน', orders: 18, spent: 9200, lastOrder: '2024-09-25' },
  { name: 'คุณมานะ ขยัน', orders: 15, spent: 7800, lastOrder: '2024-09-24' },
  { name: 'คุณสมศรี เพียร', orders: 12, spent: 6100, lastOrder: '2024-09-23' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ReportsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState('7days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate totals and changes
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const totalCustomers = salesData.reduce((sum, day) => sum + day.customers, 0);
  const avgOrderValue = totalSales / totalOrders;

  // Calculate changes (compare last 2 days)
  const salesChange = ((salesData[6].sales - salesData[5].sales) / salesData[5].sales) * 100;
  const ordersChange = ((salesData[6].orders - salesData[5].orders) / salesData[5].orders) * 100;

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          รายงาน
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<PrintIcon />}>
            พิมพ์
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            ส่งออก Excel
          </Button>
        </Box>
      </Box>

      {/* Filter Controls */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>ช่วงเวลา</InputLabel>
              <Select
                value={dateRange}
                label="ช่วงเวลา"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="today">วันนี้</MenuItem>
                <MenuItem value="7days">7 วันล่าสุด</MenuItem>
                <MenuItem value="30days">30 วันล่าสุด</MenuItem>
                <MenuItem value="thisMonth">เดือนนี้</MenuItem>
                <MenuItem value="lastMonth">เดือนก่อน</MenuItem>
                <MenuItem value="custom">กำหนดเอง</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {dateRange === 'custom' && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="วันที่เริ่ม"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="วันที่สิ้นสุด"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth startIcon={<DateRangeIcon />}>
              อัพเดท
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    ยอดขายรวม
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    ฿{totalSales.toLocaleString()}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    {salesChange >= 0 ? (
                      <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} fontSize="small" />
                    ) : (
                      <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      color={salesChange >= 0 ? 'success.main' : 'error.main'}
                    >
                      {salesChange >= 0 ? '+' : ''}{salesChange.toFixed(1)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                ออเดอร์ทั้งหมด
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {totalOrders.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {ordersChange >= 0 ? (
                  <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} fontSize="small" />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  color={ordersChange >= 0 ? 'success.main' : 'error.main'}
                >
                  {ordersChange >= 0 ? '+' : ''}{ordersChange.toFixed(1)}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                ลูกค้าทั้งหมด
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {totalCustomers.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                ค่าเฉลี่ยต่อออเดอร์
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                ฿{Math.round(avgOrderValue).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Report Tabs */}
      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
            <Tab label="ยอดขาย" />
            <Tab label="สินค้า" />
            <Tab label="ลูกค้า" />
            <Tab label="รายเดือน" />
          </Tabs>
        </Box>

        {/* Sales Report Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                แนวโน้มยอดขาย (7 วันล่าสุด)
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'dd/MM')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'dd/MM/yyyy')}
                    formatter={(value: number, name) => [
                      name === 'sales' ? `฿${value.toLocaleString()}` : value,
                      name === 'sales' ? 'ยอดขาย' : 'ออเดอร์'
                    ]}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stackId="1" 
                    stroke="#1976d2" 
                    fill="#1976d2" 
                    fillOpacity={0.6}
                    name="ยอดขาย"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="h6" gutterBottom>
                จำนวนออเดอร์
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'dd/MM')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'dd/MM/yyyy')}
                  />
                  <Bar dataKey="orders" fill="#dc004e" name="ออเดอร์" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="h6" gutterBottom>
                จำนวนลูกค้า
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'dd/MM')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'dd/MM/yyyy')}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#00C49F" 
                    strokeWidth={3}
                    name="ลูกค้า"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Products Report Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Typography variant="h6" gutterBottom>
                สินค้าขายดี
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>อันดับ</strong></TableCell>
                      <TableCell><strong>สินค้า</strong></TableCell>
                      <TableCell align="right"><strong>ขาย</strong></TableCell>
                      <TableCell align="right"><strong>รายได้</strong></TableCell>
                      <TableCell align="center"><strong>สัดส่วน</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productSalesData.map((product, index) => (
                      <TableRow key={product.name}>
                        <TableCell>
                          <Chip 
                            label={index + 1} 
                            size="small" 
                            color={index < 3 ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell align="right">{product.sales} ชิ้น</TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold">
                            ฿{product.revenue.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography color="primary">{product.percentage}%</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="h6" gutterBottom>
                สัดส่วนยอดขาย
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={productSalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {productSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Customers Report Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            ลูกค้าชั้นนำ
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>อันดับ</strong></TableCell>
                  <TableCell><strong>ชื่อลูกค้า</strong></TableCell>
                  <TableCell align="right"><strong>ออเดอร์</strong></TableCell>
                  <TableCell align="right"><strong>ยอดใช้จ่าย</strong></TableCell>
                  <TableCell><strong>ออเดอร์ล่าสุด</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCustomersData.map((customer, index) => (
                  <TableRow key={customer.name}>
                    <TableCell>
                      <Chip 
                        label={index + 1} 
                        size="small" 
                        color={index < 3 ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell align="right">{customer.orders} ครั้ง</TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold" color="primary">
                        ฿{customer.spent.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {format(new Date(customer.lastOrder), 'dd/MM/yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Monthly Report Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            รายงานรายเดือน (6 เดือนล่าสุด)
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name) => [
                  name === 'sales' ? `฿${value.toLocaleString()}` : 
                  name === 'avgOrder' ? `฿${value}` : `${value} ครั้ง`,
                  name === 'sales' ? 'ยอดขาย' : 
                  name === 'orders' ? 'ออเดอร์' : 'ค่าเฉลี่ย'
                ]}
              />
              <Legend />
              <Bar dataKey="sales" fill="#1976d2" name="ยอดขาย" />
              <Bar dataKey="orders" fill="#dc004e" name="ออเดอร์" />
            </BarChart>
          </ResponsiveContainer>

          <Box mt={3}>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>เดือน</strong></TableCell>
                    <TableCell align="right"><strong>ยอดขาย</strong></TableCell>
                    <TableCell align="right"><strong>ออเดอร์</strong></TableCell>
                    <TableCell align="right"><strong>ค่าเฉลี่ยต่อออเดอร์</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlySalesData.map((month) => (
                    <TableRow key={month.month}>
                      <TableCell>{month.month}</TableCell>
                      <TableCell align="right">
                        <Typography fontWeight="bold">
                          ฿{month.sales.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{month.orders.toLocaleString()}</TableCell>
                      <TableCell align="right">฿{month.avgOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}
