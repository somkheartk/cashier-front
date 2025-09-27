"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import AdminLayout from './AdminLayout';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const { user, isLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ป้องกัน hydration mismatch โดยไม่ render อะไรจนกว่า component จะ mount
  if (!isMounted) {
    return null;
  }

  // แสดง loading ขณะตรวจสอบ authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          กำลังตรวจสอบการเข้าสู่ระบบ...
        </Typography>
      </Box>
    );
  }

  // ถ้าผู้ใช้ล็อกอินแล้ว แสดง AdminLayout
  if (user) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // ถ้ายังไม่ได้ล็อกอิน แสดง children โดยตรง (สำหรับหน้า login)
  return <>{children}</>;
}
