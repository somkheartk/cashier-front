"use client";

import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, TextField, Button,
  Switch, FormControlLabel, Divider, Avatar, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, List, ListItem,
  ListItemIcon, ListItemText, ListItemSecondaryAction, Chip,
  Alert, Snackbar
} from '@mui/material';
import {
  Person, Security, Notifications, Backup, Palette,
  Language, Store, Payment, Print, CloudUpload,
  Save, Refresh, Delete
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'ร้านค้าทดสอบ',
    storeAddress: '123 ถนนทดสอบ จังหวัดทดสอบ',
    storePhone: '02-123-4567',
    storeEmail: 'contact@teststore.com',
    currency: 'THB',
    language: 'th',

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    orderAlerts: true,
    paymentAlerts: true,

    // System Settings
    autoBackup: true,
    backupFrequency: 'daily',
    sessionTimeout: 30,
    maxLoginAttempts: 5,

    // POS Settings
    receiptPrinter: 'thermal',
    cashDrawer: true,
    barcodeScanner: true,
    autoPrintReceipt: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('storeSettings', JSON.stringify(settings));
    setSnackbar({ open: true, message: 'บันทึกการตั้งค่าเรียบร้อยแล้ว', severity: 'success' });
  };

  const handleReset = () => {
    // Reset to default settings
    const defaultSettings = {
      storeName: 'ร้านค้าทดสอบ',
      storeAddress: '',
      storePhone: '',
      storeEmail: '',
      currency: 'THB',
      language: 'th',
      emailNotifications: true,
      smsNotifications: false,
      lowStockAlerts: true,
      orderAlerts: true,
      paymentAlerts: true,
      autoBackup: true,
      backupFrequency: 'daily',
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      receiptPrinter: 'thermal',
      cashDrawer: true,
      barcodeScanner: true,
      autoPrintReceipt: true
    };
    setSettings(defaultSettings);
    setSnackbar({ open: true, message: 'รีเซ็ตการตั้งค่าเรียบร้อยแล้ว', severity: 'info' });
  };

  const tabs = [
    { id: 'general', label: 'ทั่วไป', icon: Store },
    { id: 'notifications', label: 'แจ้งเตือน', icon: Notifications },
    { id: 'system', label: 'ระบบ', icon: Security },
    { id: 'pos', label: 'จุดขาย', icon: Payment },
    { id: 'backup', label: 'สำรองข้อมูล', icon: Backup }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>ข้อมูลร้านค้า</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ชื่อร้านค้า"
                  value={settings.storeName}
                  onChange={(e) => handleSettingChange('storeName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="เบอร์โทรศัพท์"
                  value={settings.storePhone}
                  onChange={(e) => handleSettingChange('storePhone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ที่อยู่"
                  multiline
                  rows={3}
                  value={settings.storeAddress}
                  onChange={(e) => handleSettingChange('storeAddress', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="อีเมล"
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => handleSettingChange('storeEmail', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="สกุลเงิน"
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 'notifications':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>การแจ้งเตือน</Typography>
            <List>
              <ListItem>
                <ListItemText primary="แจ้งเตือนทางอีเมล" secondary="รับการแจ้งเตือนทางอีเมล" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="แจ้งเตือนทาง SMS" secondary="รับการแจ้งเตือนทาง SMS" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="แจ้งเตือนสินค้าหมด" secondary="เมื่อสินค้าคงเหลือน้อยกว่าที่กำหนด" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.lowStockAlerts}
                    onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="แจ้งเตือนออเดอร์ใหม่" secondary="เมื่อมีออเดอร์ใหม่เข้ามา" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.orderAlerts}
                    onChange={(e) => handleSettingChange('orderAlerts', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Box>
        );

      case 'system':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>การตั้งค่าระบบ</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="เวลาหมดอายุเซสชัน (นาที)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="จำนวนครั้งที่ล็อกอินได้สูงสุด"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 'pos':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>การตั้งค่าจุดขาย</Typography>
            <List>
              <ListItem>
                <ListItemText primary="เครื่องพิมพ์ใบเสร็จ" secondary="Thermal Printer" />
                <ListItemSecondaryAction>
                  <Chip label="Thermal" color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="ลิ้นชักเก็บเงิน" secondary="Cash Drawer" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.cashDrawer}
                    onChange={(e) => handleSettingChange('cashDrawer', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="เครื่องสแกนบาร์โค้ด" secondary="Barcode Scanner" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.barcodeScanner}
                    onChange={(e) => handleSettingChange('barcodeScanner', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="พิมพ์ใบเสร็จอัตโนมัติ" secondary="Auto print receipt after payment" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.autoPrintReceipt}
                    onChange={(e) => handleSettingChange('autoPrintReceipt', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Box>
        );

      case 'backup':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>การสำรองข้อมูล</Typography>
            <List>
              <ListItem>
                <ListItemText primary="สำรองข้อมูลอัตโนมัติ" secondary="เปิดใช้งานการสำรองข้อมูลอัตโนมัติ" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.autoBackup}
                    onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="ความถี่การสำรอง" secondary="ทุกวัน" />
                <ListItemSecondaryAction>
                  <Chip label="Daily" color="info" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" startIcon={<CloudUpload />} sx={{ mr: 2 }}>
                สำรองข้อมูลทันที
              </Button>
              <Button variant="outlined" startIcon={<Refresh />}>
                คืนค่าข้อมูล
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        ⚙️ ตั้งค่าระบบ
      </Typography>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <List>
                {tabs.map((tab) => (
                  <ListItem
                    key={tab.id}
                    button
                    selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <tab.icon color={activeTab === tab.id ? 'inherit' : 'action'} />
                    </ListItemIcon>
                    <ListItemText primary={tab.label} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Content */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              {renderTabContent()}
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button startIcon={<Refresh />} onClick={handleReset} color="secondary">
                  รีเซ็ต
                </Button>
                <Button startIcon={<Save />} onClick={handleSave} variant="contained">
                  บันทึกการตั้งค่า
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity as any} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
