"use client";

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar, LinearProgress, Chip, Button,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Switch, FormControlLabel, Container, Paper, Fade, Slide, useTheme,
  useMediaQuery, Divider, List, ListItem, ListItemAvatar, ListItemText,
  ListItemSecondaryAction, Badge, Tooltip, CircularProgress
} from '@mui/material';
import {
  Refresh, Settings, TrendingUp, TrendingDown, Store, ShoppingCart,
  People, Inventory, Receipt, AttachMoney, Timeline, BarChart,
  Notifications, Schedule, Today, DateRange, AccountBalanceWallet,
  PointOfSale, Analytics, Dashboard as DashboardIcon, Speed,
  Assessment, PieChart, ShowChart, MonetizationOn, ShoppingBag,
  LocalShipping, Star, Warning, CheckCircle, Error, Info,
  Business, Category, ShoppingBasket, Payment
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { StatsCard, RecentOrders, AlertsList, QuickActions } from '../components/dashboard';

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const router = useRouter();

  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Enhanced real-time stats for POS system
  const [stats, setStats] = useState([
    {
      label: 'ยอดขายวันนี้',
      value: '฿12,450',
      change: '+15.2%',
      color: '#2E7D32',
      icon: <MonetizationOn />,
      trend: 'up',
      target: 15000,
      progress: 83
    },
    {
      label: 'จำนวนออเดอร์',
      value: '47',
      change: '+8.7%',
      color: '#1976D2',
      icon: <Receipt />,
      trend: 'up',
      target: 60,
      progress: 78.3
    },
    {
      label: 'สินค้าขายได้',
      value: '156',
      change: '+12.1%',
      color: '#ED6C02',
      icon: <ShoppingBasket />,
      trend: 'up',
      target: 200,
      progress: 78
    },
    {
      label: 'กำไรวันนี้',
      value: '฿2,890',
      change: '+18.5%',
      color: '#9C27B0',
      icon: <AccountBalanceWallet />,
      trend: 'up',
      target: 3500,
      progress: 82.6
    }
  ]);

  // Recent orders
  const [recentOrders] = useState([
    { id: 'ORD-001', customer: 'สมชาย ใจดี', total: 1250, status: 'completed', time: '10:30' },
    { id: 'ORD-002', customer: 'สมหญิง รักดี', total: 890, status: 'completed', time: '09:45' },
    { id: 'ORD-003', customer: 'วิชัย มั่นคง', total: 2100, status: 'pending', time: '09:15' },
    { id: 'ORD-004', customer: 'นางสาวพร งามเจริญ', total: 675, status: 'completed', time: '08:50' }
  ]);

  // Alerts and notifications
  const [alerts] = useState([
    { type: 'warning', message: 'สินค้า "กาแฟดำร้อน" คงเหลือน้อย (5 ชิ้น)', time: '5 นาทีที่แล้ว' },
    { type: 'info', message: 'มีออเดอร์ใหม่รอการยืนยัน', time: '10 นาทีที่แล้ว' },
    { type: 'success', message: 'สำรองข้อมูลสำเร็จ', time: '1 ชั่วโมงที่แล้ว' }
  ]);

  // Core POS system actions for small businesses
  const quickActions = [
    {
      title: 'ขายสินค้า',
      desc: 'ระบบ POS',
      href: '/pos',
      color: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      icon: <PointOfSale />,
      badge: null,
      primary: true
    },
    {
      title: 'สินค้า',
      desc: 'จัดการสินค้า',
      href: '/products',
      color: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
      icon: <Inventory />,
      badge: '12'
    },
    {
      title: 'ออเดอร์',
      desc: 'จัดการออเดอร์',
      href: '/orders',
      color: 'linear-gradient(135deg, #ED6C02 0%, #FF9800 100%)',
      icon: <Receipt />,
      badge: '3'
    },
    {
      title: 'ลูกค้า',
      desc: 'จัดการลูกค้า',
      href: '/customers',
      color: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
      icon: <People />,
      badge: null
    },
    {
      title: 'รายงาน',
      desc: 'วิเคราะห์ยอดขาย',
      href: '/reports',
      color: 'linear-gradient(135deg, #7B1FA2 0%, #9C27B0 100%)',
      icon: <Analytics />,
      badge: null
    },
    {
      title: 'ตั้งค่า',
      desc: 'ตั้งค่าระบบ',
      href: '/settings',
      color: 'linear-gradient(135deg, #424242 0%, #616161 100%)',
      icon: <Settings />,
      badge: null
    }
  ];

  // Function to refresh dashboard data
  const refreshDashboard = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update stats with new data
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: stat.label.includes('ยอดขาย') ? `฿${(Math.random() * 50000 + 40000).toFixed(0)}` :
               stat.label.includes('ออเดอร์') ? `${Math.floor(Math.random() * 200 + 150)}` :
               stat.label.includes('ลูกค้า') ? `${Math.floor(Math.random() * 50 + 20)}` :
               `${Math.floor(Math.random() * 1500 + 1000)}`,
        change: `${(Math.random() * 20 - 10).toFixed(1)}%`,
        progress: Math.random() * 100
      })));

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshDashboard, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Paper elevation={0} sx={{
          p: 4,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          textAlign: 'center'
        }}>
          <CircularProgress size={60} sx={{ mb: 2, color: '#667eea' }} />
          <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 'bold' }}>
            กำลังโหลดแดชบอร์ด...
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Fade in={!loading} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Pattern */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)'
            }} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    color: '#2E7D32',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Business sx={{ fontSize: 40 }} />
                    ยินดีต้อนรับสู่ระบบ POS
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                    ระบบจุดขายสำหรับร้านค้าขนาดเล็ก
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    ยินดีต้อนรับ, {user?.name || 'ผู้ใช้'}! พร้อมให้บริการแล้ว
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="รีเฟรชข้อมูล">
                    <IconButton
                      onClick={refreshDashboard}
                      disabled={isRefreshing}
                      sx={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.2)'
                        }
                      }}
                    >
                      <Refresh sx={{
                        animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' }
                        }
                      }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="ตั้งค่า">
                    <IconButton
                      onClick={() => setSettingsOpen(true)}
                      sx={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.2)'
                        }
                      }}
                    >
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Stats Cards */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3,
          mb: 4
        }}>
          {stats.map((stat, index) => (
            <Box key={index}>
              <Slide direction="up" in={!loading} timeout={500 + index * 100}>
                <div>
                  <StatsCard stat={stat} index={index} loading={loading} />
                </div>
              </Slide>
            </Box>
          ))}
        </Box>

        {/* Main Content Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr'
          },
          gap: 3
        }}>
          {/* Quick Actions */}
          <Box>
            <Fade in={!loading} timeout={1500}>
              <div>
                <QuickActions actions={quickActions} loading={loading} />
              </div>
            </Fade>
          </Box>

          {/* Sidebar */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Recent Orders */}
            <Fade in={!loading} timeout={1800}>
              <div>
                <RecentOrders orders={recentOrders} loading={loading} />
              </div>
            </Fade>

            {/* Alerts */}
            <Fade in={!loading} timeout={2000}>
              <div>
                <AlertsList alerts={alerts} loading={loading} />
              </div>
            </Fade>
          </Box>
        </Box>

        <Fade in={!loading} timeout={2200}>
          <div>
            <Box sx={{
              mt: 6,
              textAlign: 'center',
              color: '#666'
            }}>
              <Paper elevation={1} sx={{
                p: 3,
                borderRadius: 3,
                background: 'white',
                border: '1px solid #e0e0e0',
                display: 'inline-block'
              }}>
                <Typography variant="h6" sx={{
                  fontWeight: 'bold',
                  textShadow: 'none',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: '#2E7D32'
                }}>
                  <CheckCircle sx={{ color: '#2E7D32' }} />
                  ระบบพร้อมใช้งาน - เริ่มต้นการขายได้เลย!
                  <CheckCircle sx={{ color: '#2E7D32' }} />
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  อัพเดทล่าสุด: {lastUpdate.toLocaleDateString('th-TH')} {lastUpdate.toLocaleTimeString('th-TH')}
                </Typography>
              </Paper>
            </Box>
          </div>
        </Fade>

        <Dialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'white',
              border: '1px solid #e0e0e0'
            }
          }}
        >
          <DialogTitle sx={{
            background: '#f5f5f5',
            color: '#2E7D32',
            fontWeight: 'bold',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Settings sx={{ mr: 1, verticalAlign: 'middle' }} />
            ตั้งค่าระบบ
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
              การแจ้งเตือน
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked sx={{ color: '#667eea' }} />}
              label="แจ้งเตือนเมื่อสินค้าหมด"
            />
            <FormControlLabel
              control={<Switch defaultChecked sx={{ color: '#667eea' }} />}
              label="แจ้งเตือนออเดอร์ใหม่"
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
              การแสดงผล
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked sx={{ color: '#667eea' }} />}
              label="แสดงยอดขายแบบเรียลไทม์"
            />
            <FormControlLabel
              control={<Switch sx={{ color: '#667eea' }} />}
              label="โหมดมืด"
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
              การสำรองข้อมูล
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 1,
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#667eea',
                  bgcolor: 'rgba(102, 126, 234, 0.1)'
                }
              }}
            >
              สำรองข้อมูลทันที
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 1,
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#667eea',
                  bgcolor: 'rgba(102, 126, 234, 0.1)'
                }
              }}
            >
              คืนค่าข้อมูล
            </Button>
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
            <Button onClick={() => setSettingsOpen(false)} sx={{ color: 'text.secondary' }}>
              ยกเลิก
            </Button>
            <Button
              onClick={() => setSettingsOpen(false)}
              variant="contained"
              sx={{
                background: '#2E7D32',
                '&:hover': {
                  background: '#1B5E20'
                }
              }}
            >
              บันทึก
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}


