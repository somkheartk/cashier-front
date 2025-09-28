"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CustomerStatsCards, CustomersTable, CustomerFormDialog } from '@/components/customers';
import { Customer } from '@/types';

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
  const stats = useMemo(() => ({
    total: customers.length,
    bronze: customers.filter(c => c.membershipLevel === 'bronze').length,
    silver: customers.filter(c => c.membershipLevel === 'silver').length,
    gold: customers.filter(c => c.membershipLevel === 'gold').length,
    avgSpent: customers.length > 0 ? Math.round(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length) : 0
  }), [customers]);

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
      <CustomerStatsCards stats={stats} formatCurrency={formatCurrency} />

      {/* Customers Table */}
      <CustomersTable
        customers={customers}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
        getMembershipColor={getMembershipColor}
        getMembershipText={getMembershipText}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />

      {/* Add/Edit Customer Dialog */}
      <CustomerFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        customer={selectedCustomer}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSaveCustomer}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </Box>
  );
}