"use client";

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        🏪 แดชบอร์ด POS Admin
      </Typography>
      
      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mb: 4 }}>
        <Card elevation={3} sx={{ borderLeft: '4px solid #1976d2' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" variant="body2">
                  ยอดขายวันนี้
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  ฿25,420
                </Typography>
                <Typography variant="body2" color="success.main">
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                  +12.5%
                </Typography>
              </Box>
              <AttachMoney sx={{ fontSize: 48, color: 'primary.main', opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ borderLeft: '4px solid #4caf50' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" variant="body2">
                  ออเดอร์วันนี้
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  87
                </Typography>
                <Typography variant="body2" color="success.main">
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                  +8.2%
                </Typography>
              </Box>
              <ShoppingCart sx={{ fontSize: 48, color: 'success.main', opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ borderLeft: '4px solid #ff9800' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" variant="body2">
                  ลูกค้าใหม่
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="warning.main">
                  23
                </Typography>
                <Typography variant="body2" color="error.main">
                  -2.4%
                </Typography>
              </Box>
              <People sx={{ fontSize: 48, color: 'warning.main', opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ borderLeft: '4px solid #2196f3' }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" variant="body2">
                  สินค้าคงเหลือ
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="info.main">
                  1,245
                </Typography>
                <Typography variant="body2" color="success.main">
                  +0.8%
                </Typography>
              </Box>
              <Inventory sx={{ fontSize: 48, color: 'info.main', opacity: 0.7 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 3 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            📈 ยอดขาย 7 วันย้อนหลัง
          </Typography>
          <Box sx={{ 
            height: 300, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.50',
            borderRadius: 1,
            border: '1px dashed #ccc'
          }}>
            <Typography color="textSecondary">
              📊 กราฟยอดขายจะแสดงที่นี่
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            🎯 สัดส่วนตามหมวดหมู่
          </Typography>
          <Box sx={{ 
            height: 300, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.50',
            borderRadius: 1,
            border: '1px dashed #ccc',
            gap: 2
          }}>
            <Typography color="textSecondary" textAlign="center">
              🥧 Pie Chart จะแสดงที่นี่
            </Typography>
            <Box>
              <Typography variant="body2">🍹 เครื่องดื่ม: 35%</Typography>
              <Typography variant="body2">🍽️ อาหาร: 45%</Typography>
              <Typography variant="body2">🍪 ขนม: 20%</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            🏆 สินค้าขายดี
          </Typography>
          <Box>
            {[
              { name: 'กาแฟเย็น', sales: 150, revenue: 4500, rank: '🥇' },
              { name: 'ข้าวผัด', sales: 120, revenue: 3600, rank: '🥈' },
              { name: 'ส้มตำ', sales: 100, revenue: 2500, rank: '🥉' },
              { name: 'น้ำส้ม', sales: 80, revenue: 1600, rank: '4️⃣' },
            ].map((product, index) => (
              <Box 
                key={product.name}
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                py={2}
                borderBottom={index < 3 ? 1 : 0}
                borderColor="divider"
              >
                <Box display="flex" alignItems="center">
                  <Typography sx={{ mr: 2, fontSize: 20 }}>
                    {product.rank}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.name}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ฿{product.revenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ขาย {product.sales} ชิ้น
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            ⚡ การดำเนินการด่วน
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<ShoppingCart />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              ออเดอร์ใหม่
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<People />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              ลูกค้าใหม่
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<Inventory />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              จัดการสินค้า
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<AttachMoney />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              รายงาน
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
            <Typography variant="body2" color="primary.contrastText" textAlign="center">
              🎉 ระบบ POS Admin พร้อมใช้งานแล้ว!<br />
              เข้าไปที่เมนูต่างๆ เพื่อจัดการร้านของคุณ
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
