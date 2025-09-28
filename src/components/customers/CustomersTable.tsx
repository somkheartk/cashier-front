import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Person as PersonIcon } from '@mui/icons-material';
import { Customer } from '@/types/customers';

interface CustomersTableProps {
  customers: Customer[];
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: number) => void;
  getMembershipColor: (level: Customer['membershipLevel']) => string;
  getMembershipText: (level: Customer['membershipLevel']) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export default function CustomersTable({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  getMembershipColor,
  getMembershipText,
  formatCurrency,
  formatDate
}: CustomersTableProps) {
  return (
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
                      onClick={() => onEditCustomer(customer)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDeleteCustomer(customer.id)}
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
  );
}
