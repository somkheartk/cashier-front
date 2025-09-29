"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CustomerStatsCards, CustomersTable, CustomerFormDialog } from '@/components/customers';
import { Customer, CustomerFormData } from '@/types';
import { apiService } from '@/services/api';

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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Load customers from API
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customersData = await apiService.getCustomers();
        setCustomers(customersData);
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);
  const [customerFormData, setCustomerFormData] = useState<CustomerFormData>({
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
    setCustomerFormData({
      name: '',
      email: '',
      phone: '',
      membershipLevel: 'bronze'
    });
    setOpenDialog(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerFormData({
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
          ? { ...c, ...customerFormData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now(),
        ...customerFormData,
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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <CustomerStatsCards stats={stats} formatCurrency={formatCurrency} />
      )}

      {/* Customers Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <CustomersTable
          customers={customers}
          onEditCustomer={handleEditCustomer}
          onDeleteCustomer={handleDeleteCustomer}
          getMembershipColor={getMembershipColor}
          getMembershipText={getMembershipText}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      )}

      {/* Add/Edit Customer Dialog */}
      <CustomerFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        customer={selectedCustomer}
        formData={customerFormData}
        onFormDataChange={setCustomerFormData}
        onSave={handleSaveCustomer}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </Box>
  );
}