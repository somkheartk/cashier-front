'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import RoleBadge from './RoleBadge';

const drawerWidth = 240;

const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = "POS System" }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  
  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  const menuItems = [
    { text: 'แดชบอร์ด', icon: <DashboardIcon />, href: '/' },
    { text: 'จัดการออเดอร์', icon: <ShoppingCartIcon />, href: '/orders' },
    { text: 'จัดการลูกค้า', icon: <PeopleIcon />, href: '/customers' },
    { text: 'รายงาน', icon: <BarChartIcon />, href: '/reports' },
  ];

  return (
<Box sx={{ display: 'flex' }}>
<CssBaseline />
<MyAppBar position="fixed" open={open}>
<Toolbar>
{!open && (
<IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
<MenuIcon />
</IconButton>
)}
<Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>{title}</Typography>
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
<Chip
label={user?.name || 'ผู้ใช้'}
variant="outlined"
sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
avatar={<Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}><AccountCircleIcon /></Avatar>}
/>
<IconButton color="inherit" onClick={handleUserMenuOpen}>
<AccountCircleIcon />
</IconButton>
</Box>
</Toolbar>
</MyAppBar>


<Drawer variant="persistent" anchor="left" open={open} sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }) } }}>
<Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<Typography variant="h6">เมนู</Typography>
<IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton>
</Toolbar>
<Divider />
<List>
{menuItems.map(item => (
<Link key={item.text} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
<ListItemButton selected={pathname === item.href}>
<ListItemIcon>{item.icon}</ListItemIcon>
<ListItemText primary={item.text} />
</ListItemButton>
</Link>
))}
</List>
<Divider />
<Box sx={{ flexGrow: 1 }} />
<Box sx={{ p: 2 }}><Typography variant="caption">เวอร์ชัน 1.0</Typography></Box>
</Drawer>


<Main open={open}><Toolbar />{children}</Main>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 24, height: 24 }}>
              <AccountCircleIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {user?.name || 'ผู้ใช้'}
              </Typography>
              <RoleBadge roles={user?.roles || []} size="small" />
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminLayout;
