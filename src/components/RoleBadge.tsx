"use client";

import React from 'react';
import { Chip, Box } from '@mui/material';
import { 
  AdminPanelSettings, 
  ManageAccounts, 
  PointOfSale, 
  Visibility 
} from '@mui/icons-material';

interface RoleBadgeProps {
  roles: string[];
  size?: 'small' | 'medium';
}

const roleConfig = {
  admin: {
    label: 'แอดมิน',
    color: 'error' as const,
    icon: <AdminPanelSettings fontSize="small" />
  },
  manager: {
    label: 'ผู้จัดการ',
    color: 'primary' as const,
    icon: <ManageAccounts fontSize="small" />
  },
  cashier: {
    label: 'แคชเชียร์',
    color: 'success' as const,
    icon: <PointOfSale fontSize="small" />
  },
  viewer: {
    label: 'ผู้ดู',
    color: 'default' as const,
    icon: <Visibility fontSize="small" />
  }
};

export default function RoleBadge({ roles, size = 'small' }: RoleBadgeProps) {
  if (!roles || roles.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {roles.map((role) => {
        const config = roleConfig[role as keyof typeof roleConfig];
        if (!config) return null;
        
        return (
          <Chip
            key={role}
            label={config.label}
            color={config.color}
            size={size}
            icon={config.icon}
            variant="filled"
            sx={{ fontSize: '0.75rem' }}
          />
        );
      })}
    </Box>
  );
}
