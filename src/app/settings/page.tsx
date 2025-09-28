"use client";

import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, TextField, Button,
  Switch, FormControlLabel, Divider, Avatar, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, List, ListItem,
  ListItemIcon, ListItemText, ListItemSecondaryAction, Chip,
  Alert, Snackbar, Paper, Tabs, Tab, Fade, Slide, Container,
  useTheme, useMediaQuery, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  Person, Security, Notifications, Backup, Palette,
  Language, Store, Payment, Print, CloudUpload,
  Save, Refresh, Delete, ExpandMore, Settings as SettingsIcon,
  Business, Phone, Email, MonetizationOn, Shield, Storage,
  Receipt, PointOfSale, NotificationsActive
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
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
    { label: 'ทั่วไป', icon: <Business />, color: '#667eea' },
    { label: 'แจ้งเตือน', icon: <NotificationsActive />, color: '#764ba2' },
    { label: 'ระบบ', icon: <Shield />, color: '#f093fb' },
    { label: 'จุดขาย', icon: <PointOfSale />, color: '#4facfe' },
    { label: 'ข้อมูล', icon: <Storage />, color: '#43e97b' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // General
        return (
          <Fade in={activeTab === 0} timeout={500}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <Business sx={{ mr: 2, verticalAlign: 'middle' }} />
                ข้อมูลร้านค้า
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Store color="primary" />
                      ข้อมูลพื้นฐาน
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        fullWidth
                        label="ชื่อร้านค้า"
                        value={settings.storeName}
                        onChange={(e) => handleSettingChange('storeName', e.target.value)}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="เบอร์โทรศัพท์"
                        value={settings.storePhone}
                        onChange={(e) => handleSettingChange('storePhone', e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 2
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email color="primary" />
                      ข้อมูลติดต่อ
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        fullWidth
                        label="อีเมล"
                        type="email"
                        value={settings.storeEmail}
                        onChange={(e) => handleSettingChange('storeEmail', e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="สกุลเงิน"
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <MonetizationOn sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 2
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Language color="primary" />
                      ที่อยู่ร้านค้า
                    </Typography>
                    <TextField
                      fullWidth
                      label="ที่อยู่"
                      multiline
                      rows={4}
                      value={settings.storeAddress}
                      onChange={(e) => handleSettingChange('storeAddress', e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          borderRadius: 2
                        }
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      case 1: // Notifications
        return (
          <Fade in={activeTab === 1} timeout={500}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <NotificationsActive sx={{ mr: 2, verticalAlign: 'middle' }} />
                การแจ้งเตือน
              </Typography>

              <Grid container spacing={3}>
                {[
                  { key: 'emailNotifications', label: 'แจ้งเตือนทางอีเมล', desc: 'รับการแจ้งเตือนทางอีเมล', icon: <Email /> },
                  { key: 'smsNotifications', label: 'แจ้งเตือนทาง SMS', desc: 'รับการแจ้งเตือนทาง SMS', icon: <Phone /> },
                  { key: 'lowStockAlerts', label: 'แจ้งเตือนสินค้าหมด', desc: 'เมื่อสินค้าคงเหลือน้อยกว่าที่กำหนด', icon: <Storage /> },
                  { key: 'orderAlerts', label: 'แจ้งเตือนออเดอร์ใหม่', desc: 'เมื่อมีออเดอร์ใหม่เข้ามา', icon: <Receipt /> },
                  { key: 'paymentAlerts', label: 'แจ้งเตือนการชำระเงิน', desc: 'เมื่อมีการชำระเงินสำเร็จ', icon: <Payment /> }
                ].map((item, index) => (
                  <Grid item xs={12} md={6} key={item.key}>
                    <Slide direction="up" in={activeTab === 1} timeout={500 + index * 100}>
                      <Card elevation={0} sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)',
                        border: '1px solid rgba(118, 75, 162, 0.2)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 25px rgba(118, 75, 162, 0.15)'
                        }
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{
                                bgcolor: 'rgba(118, 75, 162, 0.1)',
                                color: '#764ba2'
                              }}>
                                {item.icon}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                  {item.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.desc}
                                </Typography>
                              </Box>
                            </Box>
                            <Switch
                              checked={settings[item.key as keyof typeof settings] as boolean}
                              onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#764ba2',
                                  '&:hover': {
                                    bgcolor: 'rgba(118, 75, 162, 0.1)'
                                  }
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  bgcolor: '#764ba2'
                                }
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Slide>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        );

      case 2: // System
        return (
          <Fade in={activeTab === 2} timeout={500}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <Shield sx={{ mr: 2, verticalAlign: 'middle' }} />
                การตั้งค่าระบบ
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
                    border: '1px solid rgba(240, 147, 251, 0.2)'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Security color="secondary" />
                      ความปลอดภัย
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        fullWidth
                        label="เวลาหมดอายุเซสชัน (นาที)"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 2
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="จำนวนครั้งที่ล็อกอินได้สูงสุด"
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 2
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
                    border: '1px solid rgba(240, 147, 251, 0.2)'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Backup color="secondary" />
                      การสำรองข้อมูล
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.autoBackup}
                            onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#f5576c',
                                '&:hover': {
                                  bgcolor: 'rgba(245, 87, 108, 0.1)'
                                }
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                bgcolor: '#f5576c'
                              }
                            }}
                          />
                        }
                        label="สำรองข้อมูลอัตโนมัติ"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography>ความถี่:</Typography>
                        <Chip label="ทุกวัน" color="secondary" variant="outlined" />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      case 3: // POS
        return (
          <Fade in={activeTab === 3} timeout={500}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <PointOfSale sx={{ mr: 2, verticalAlign: 'middle' }} />
                การตั้งค่าจุดขาย
              </Typography>

              <Grid container spacing={3}>
                {[
                  { key: 'cashDrawer', label: 'ลิ้นชักเก็บเงิน', desc: 'Cash Drawer', icon: <Payment /> },
                  { key: 'barcodeScanner', label: 'เครื่องสแกนบาร์โค้ด', desc: 'Barcode Scanner', icon: <Storage /> },
                  { key: 'autoPrintReceipt', label: 'พิมพ์ใบเสร็จอัตโนมัติ', desc: 'Auto print receipt after payment', icon: <Print /> }
                ].map((item, index) => (
                  <Grid item xs={12} md={4} key={item.key}>
                    <Slide direction="up" in={activeTab === 3} timeout={500 + index * 100}>
                      <Card elevation={0} sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
                        border: '1px solid rgba(79, 172, 254, 0.2)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 25px rgba(79, 172, 254, 0.15)'
                        }
                      }}>
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                          <Avatar sx={{
                            mx: 'auto',
                            mb: 2,
                            bgcolor: 'rgba(79, 172, 254, 0.1)',
                            color: '#4facfe',
                            width: 60,
                            height: 60
                          }}>
                            {item.icon}
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {item.desc}
                          </Typography>
                          <Switch
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#4facfe',
                                '&:hover': {
                                  bgcolor: 'rgba(79, 172, 254, 0.1)'
                                }
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                bgcolor: '#4facfe'
                              }
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Slide>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Paper elevation={0} sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
                    border: '1px solid rgba(79, 172, 254, 0.2)'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Print color="info" />
                      เครื่องพิมพ์ใบเสร็จ
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography>ประเภท:</Typography>
                      <Chip label="Thermal Printer" color="info" sx={{ fontWeight: 600 }} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      case 4: // Backup
        return (
          <Fade in={activeTab === 4} timeout={500}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <Storage sx={{ mr: 2, verticalAlign: 'middle' }} />
                การจัดการข้อมูล
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
                    border: '1px solid rgba(67, 233, 123, 0.2)'
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CloudUpload sx={{ color: '#43e97b' }} />
                        สำรองข้อมูล
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        สำรองข้อมูลระบบเพื่อป้องกันการสูญหาย
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CloudUpload />}
                        sx={{
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #38e97b 0%, #2df9d7 100%)'
                          }
                        }}
                      >
                        สำรองข้อมูลทันที
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
                    border: '1px solid rgba(67, 233, 123, 0.2)'
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Refresh sx={{ color: '#43e97b' }} />
                        คืนค่าข้อมูล
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        คืนค่าข้อมูลจากไฟล์สำรอง
                      </Typography>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Refresh />}
                        sx={{
                          borderRadius: 2,
                          borderColor: '#43e97b',
                          color: '#43e97b',
                          '&:hover': {
                            borderColor: '#38e97b',
                            bgcolor: 'rgba(67, 233, 123, 0.1)'
                          }
                        }}
                      >
                        คืนค่าข้อมูล
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{
              mr: 3,
              width: 64,
              height: 64,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <SettingsIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                ตั้งค่าระบบ
              </Typography>
              <Typography variant="h6" color="text.secondary">
                จัดการการตั้งค่าทั้งหมดของระบบร้านค้า
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            overflow: 'hidden'
          }}
        >
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2,
                  mx: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(102, 126, 234, 0.1)'
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={tab.label}
                  iconPosition="start"
                  sx={{
                    color: activeTab === index ? tab.color : 'text.secondary',
                    '&.Mui-selected': {
                      color: tab.color,
                      bgcolor: `${tab.color}20`
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Content */}
          <Box sx={{ p: 4 }}>
            {renderTabContent()}

            {/* Action Buttons */}
            <Box sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              gap: 3,
              justifyContent: 'flex-end',
              flexWrap: 'wrap'
            }}>
              <Button
                startIcon={<Refresh />}
                onClick={handleReset}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  borderColor: 'grey.300',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50'
                  }
                }}
              >
                รีเซ็ต
              </Button>
              <Button
                startIcon={<Save />}
                onClick={handleSave}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                  }
                }}
              >
                บันทึกการตั้งค่า
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity={snackbar.severity as any}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
