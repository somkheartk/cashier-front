"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
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
  TextField,
  IconButton,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipLevel: 'bronze' | 'silver' | 'gold';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  avatar?: string;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'สมชาย ใจดี',
    email: 'somchai@email.com',
    phone: '081-234-5678',
    membershipLevel: 'gold',
    totalOrders: 45,
    totalSpent: 125000,
    lastOrderDate: '2024-01-15',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'สมหญิง รักสวย',
    email: 'somying@email.com',
    phone: '082-345-6789',
    membershipLevel: 'silver',
    totalOrders: 28,
    totalSpent: 75000,
    lastOrderDate: '2024-01-14',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'นายสมศักดิ์ มีเงิน',
    email: 'somsak@email.com',
    phone: '083-456-7890',
    membershipLevel: 'bronze',
    totalOrders: 12,
    totalSpent: 25000,
    lastOrderDate: '2024-01-13'
  }
];

const getMembershipColor = (level: Customer['membershipLevel']) => {
  switch (level) {
    case 'bronze': return '#cd7f32';
    case 'silver': return '#c0c0c0';
    case 'gold': return '#ffd700';
    default: return '#757575';
  }
};

const getMembershipText = (level: Customer['membershipLevel']) => {
  switch (level) {
    case 'bronze': return 'บรอนซ์';
    case 'silver': return 'ซิลเวอร์';
    case 'gold': return 'โกลด์';
    default: return '';
  }
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipLevel: 'bronze' as Customer['membershipLevel']
  });

  // Statistics
  const stats = {
    total: customers.length,
    bronze: customers.filter(c => c.membershipLevel === 'bronze').length,
    silver: customers.filter(c => c.membershipLevel === 'silver').length,
    gold: customers.filter(c => c.membershipLevel === 'gold').length,
    avgSpent: Math.round(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length)
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      membershipLevel: 'bronze'
    });
    setOpenDialog(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      membershipLevel: customer.membershipLevel
    });
    setOpenDialog(true);
  };

  const handleSaveCustomer = () => {
    if (selectedCustomer) {
      // Edit existing customer
      setCustomers(customers.map(c =>
        c.id === selectedCustomer.id
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now(),
        ...formData,
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: new Date().toISOString().split('T')[0]
      };
      setCustomers([...customers, newCustomer]);
    }
    setOpenDialog(false);
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          👥 จัดการลูกค้า
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
          size="large"
        >
          เพิ่มลูกค้าใหม่
        </Button>
      </Box>

      {/* Statistics Cards */}
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

      {/* Customers Table */}
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ลูกค้า</TableCell>
                <TableCell>อีเมล</TableCell>
                <TableCell>เบอร์โทร</TableCell>
                <TableCell>สมาชิก</TableCell>
                <TableCell align="center">จำนวนออร์เดอร์</TableCell>
                <TableCell align="right">ยอดรวม</TableCell>
                <TableCell align="center">ออร์เดอร์ล่าสุด</TableCell>
                <TableCell align="center">การจัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={customer.avatar} 
                        sx={{ width: 40, height: 40 }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Typography variant="body1" fontWeight="medium">
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={getMembershipText(customer.membershipLevel)}
                      size="small"
                      sx={{
                        bgcolor: getMembershipColor(customer.membershipLevel),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="medium">
                      {customer.totalOrders}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      {formatCurrency(customer.totalSpent)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(customer.lastOrderDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Customer Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCustomer ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มลูกค้าใหม่'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="textSecondary" mb={1}>ชื่อลูกค้า</Typography>
                <TextField
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="กรุณาใส่ชื่อลูกค้า"
                />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary" mb={1}>เบอร์โทรศัพท์</Typography>
                <TextField
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="กรุณาใส่เบอร์โทรศัพท์"
                />
              </Box>
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography variant="body2" color="textSecondary" mb={1}>อีเมล</Typography>
                <TextField
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="กรุณาใส่อีเมล"
                />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary" mb={1}>ระดับสมาชิก</Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.membershipLevel}
                    onChange={(e) => setFormData({...formData, membershipLevel: e.target.value as Customer['membershipLevel']})}
                  >
                    <MenuItem value="bronze">บรอนซ์</MenuItem>
                    <MenuItem value="silver">ซิลเวอร์</MenuItem>
                    <MenuItem value="gold">โกลด์</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {selectedCustomer && (
              <>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>ข้อมูลเพิ่มเติม</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {selectedCustomer.totalOrders}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      จำนวนออร์เดอร์
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      {formatCurrency(selectedCustomer.totalSpent)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ยอดรวมทั้งหมด
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main" fontWeight="bold">
                      {formatDate(selectedCustomer.lastOrderDate)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ออร์เดอร์ล่าสุด
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="outlined"
          >
            ยกเลิก
          </Button>
          <Button 
            onClick={handleSaveCustomer}
            variant="contained"
            disabled={!formData.name || !formData.email || !formData.phone}
          >
            {selectedCustomer ? 'บันทึกการแก้ไข' : 'เพิ่มลูกค้า'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}