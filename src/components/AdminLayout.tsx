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
  Alert,
  Snackbar,
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
  Settings as SettingsIcon,
  Inventory as InventoryIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import RoleBadge from './RoleBadge';

// CSS Animations
const customStyles = `
  @keyframes glow {
    from {
      box-shadow: 0 0 5px rgba(255,255,255,0.2);
    }
    to {
      box-shadow: 0 0 15px rgba(255,255,255,0.4);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

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
  const [open, setOpen] = useState(false); // เริ่มต้นยุบไว้เสมอ
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [roleMenuAnchor, setRoleMenuAnchor] = useState<null | HTMLElement>(null);
  const [roleChangeAlert, setRoleChangeAlert] = useState<string | null>(null);
  const theme = useTheme();
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();

  // บังคับให้ Sidebar ยุบในหน้าจอเล็ก
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) { // md breakpoint
        setOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // เรียกทันทีเพื่อเช็คขนาดหน้าจอปัจจุบัน
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  
  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  const handleRoleChange = async (newRole: string) => {
    try {
      await switchRole(newRole);
      setRoleMenuAnchor(null);
      setRoleChangeAlert(`เปลี่ยนเป็น ${getThaiRoleName(newRole)} แล้ว!`);
    } catch (error) {
      console.error('Error switching role:', error);
    }
  };

  const getThaiRoleName = (role: string): string => {
    const roleNames: { [key: string]: string } = {
      'admin': 'แอดมิน',
      'manager': 'ผู้จัดการ',
      'cashier': 'แคชเชียร์'
    };
    return roleNames[role] || role;
  };

  // เมนูจาก Database
  const [menuItems, setMenuItems] = React.useState([]);
  
  // Icon mapping
  const iconMap = {
    'DashboardIcon': <DashboardIcon />,
    'PaymentIcon': <PaymentIcon />,
    'ShoppingCartIcon': <ShoppingCartIcon />,
    'InventoryIcon': <InventoryIcon />,
    'PeopleIcon': <PeopleIcon />,
    'BarChartIcon': <BarChartIcon />,
    'SettingsIcon': <SettingsIcon />,
  };

  // โหลดเมนูจาก API
  React.useEffect(() => {
    const loadUserMenus = async () => {
      if (!user) return;
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7800';
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${apiUrl}/menu/user-menus`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const menus = await response.json();
          const menuItemsWithIcons = menus.map(menu => ({
            text: menu.name,
            icon: iconMap[menu.icon] || <DashboardIcon />,
            href: menu.path,
            description: menu.description
          }));
          setMenuItems(menuItemsWithIcons);
        }
      } catch (error) {
        console.error('Error loading menus:', error);
        // Fallback to default dashboard menu
        setMenuItems([{
          text: 'แดชบอร์ด',
          icon: <DashboardIcon />,
          href: '/',
          description: 'ภาพรวมระบบ'
        }]);
      }
    };

    loadUserMenus();
  }, [user?.currentRole]); // เมื่อเปลี่ยน role ให้โหลดเมนูใหม่

  return (
<Box sx={{ display: 'flex' }}>
<CssBaseline />
<style>{`
        @keyframes glow {
          0% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          }
          100% {
            box-shadow: 0 8px 32px rgba(33,150,243,0.4);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        ${customStyles}
      `}</style>
<MyAppBar position="fixed" open={open}>
<Toolbar>
{!open && (
<IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
<MenuIcon />
</IconButton>
)}
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'white' }}>
              {title}
            </Typography>
            
            {/* Current Role Indicator - Simplified */}
            {user?.currentRole && (
              <Box 
                onClick={(e) => user.roles.length > 1 && setRoleMenuAnchor(e.currentTarget)}
                sx={{ 
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: '12px',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  cursor: user.roles.length > 1 ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  '&:hover': user.roles.length > 1 ? {
                    bgcolor: 'rgba(255,255,255,0.25)',
                    transform: 'scale(1.02)'
                  } : {}
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  {getThaiRoleName(user.currentRole)}
                </Typography>
                {user.roles.length > 1 && (
                  <Box 
                    sx={{ 
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                )}
              </Box>
            )}
            
            {/* User Avatar - รวมเป็นอันเดียว */}
            <Chip
              label={user?.name || 'ผู้ใช้'}
              variant="outlined"
              clickable
              onClick={handleUserMenuOpen}
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.5)'
                },
                cursor: 'pointer'
              }}
              avatar={
                <Avatar sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              }
            />
</Toolbar>
</MyAppBar>


<Drawer variant="persistent" anchor="left" open={open} sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }) } }}>
<Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
    <Typography variant="h6">เมนู</Typography>
    <IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton>
  </Box>
  {user?.currentRole && (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" color="text.secondary">บทบาท:</Typography>
      <RoleBadge roles={[user.currentRole]} size="small" />
    </Box>
  )}
</Toolbar>
<Divider />
<List>
{menuItems.map(item => (
<Link key={item.text} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
<ListItemButton 
  selected={pathname === item.href}
  onClick={() => {
    // ปิด drawer อัตโนมัติในหน้าจอเล็ก
    if (window.innerWidth < 960) {
      setOpen(false);
    }
  }}
>
<ListItemIcon>{item.icon}</ListItemIcon>
<ListItemText primary={item.text} />
</ListItemButton>
</Link>
))}
</List>
<Divider />
<Box sx={{ flexGrow: 1 }} />
<Box sx={{ p: 2 }}>
  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
    เมนูที่ใช้ได้: {menuItems.length} รายการ
  </Typography>
  <Typography variant="caption">เวอร์ชัน 1.0</Typography>
</Box>
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
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            width: '100%',
            py: 1
          }}>
            <Avatar sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                {user?.name || 'ผู้ใช้'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RoleBadge roles={user?.currentRole ? [user.currentRole] : []} size="small" />
                {user?.roles && user.roles.length > 1 && (
                  <Chip 
                    label={`+${user.roles.length - 1}`} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.7rem', 
                      height: 20,
                      bgcolor: 'primary.50',
                      borderColor: 'primary.200'
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>

      {/* Role Change Notification */}
      <Snackbar
        open={!!roleChangeAlert}
        autoHideDuration={4000}
        onClose={() => setRoleChangeAlert(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert 
          onClose={() => setRoleChangeAlert(null)} 
          severity="success"
          variant="filled"
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 3,
            minWidth: 280,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
          icon={
            <Box sx={{ 
              fontSize: '1.2rem',
              animation: 'pulse 1s ease-in-out 3'
            }}>
              ✨
            </Box>
          }
        >
          {roleChangeAlert}
        </Alert>
      </Snackbar>

      {/* Role Switch Menu for Header Indicator */}
      <Menu
        anchorEl={roleMenuAnchor}
        open={Boolean(roleMenuAnchor)}
        onClose={() => setRoleMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            bgcolor: 'white',
            borderRadius: 2,
            minWidth: 180,
            mt: 1,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }
        }}
      >
        {user?.roles?.map((role) => (
          <MenuItem
            key={role}
            onClick={() => handleRoleChange(role)}
            disabled={role === user.currentRole}
            sx={{
              py: 1.2,
              px: 2,
              bgcolor: role === user.currentRole ? 'primary.main' : 'transparent',
              color: role === user.currentRole ? 'white' : 'text.primary',
              '&:hover': {
                bgcolor: role === user.currentRole ? 'primary.main' : 'primary.50',
              },
              '&.Mui-disabled': {
                opacity: 1
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="body2" fontWeight="medium">
                {getThaiRoleName(role)}
              </Typography>
              {role === user.currentRole && (
                <Box 
                  sx={{ 
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'white',
                  }}
                />
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AdminLayout;
