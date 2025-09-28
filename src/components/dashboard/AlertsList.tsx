import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@mui/material';
import { Notifications, Warning, CheckCircle, Error, Info } from '@mui/icons-material';
import { AlertData } from '@/types/dashboard';

interface AlertsListProps {
  alerts: AlertData[];
  loading: boolean;
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts, loading }) => {
  return (
    <Paper elevation={2} sx={{
      p: 3,
      borderRadius: 3,
      background: 'white',
      border: '1px solid #e0e0e0'
    }}>
      <Typography variant="h6" sx={{
        fontWeight: 'bold',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: '#ED6C02'
      }}>
        <Notifications sx={{ color: '#ED6C02' }} />
        แจ้งเตือน
      </Typography>

      <List sx={{ p: 0 }}>
        {alerts.map((alert, index) => (
          <ListItem key={index} sx={{
            px: 0,
            py: 1.5,
            borderBottom: index < alerts.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none'
          }}>
            <ListItemAvatar>
              <Avatar sx={{
                bgcolor: alert.type === 'warning' ? '#FFF3E0' :
                         alert.type === 'success' ? '#E8F5E8' :
                         alert.type === 'error' ? '#FFEBEE' : '#E3F2FD',
                width: 36,
                height: 36
              }}>
                {alert.type === 'warning' ? <Warning sx={{ color: '#E65100', fontSize: 18 }} /> :
                 alert.type === 'success' ? <CheckCircle sx={{ color: '#2E7D32', fontSize: 18 }} /> :
                 alert.type === 'error' ? <Error sx={{ color: '#C62828', fontSize: 18 }} /> :
                 <Info sx={{ color: '#1565C0', fontSize: 18 }} />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 'medium', lineHeight: 1.3 }}>
                  {alert.message}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary" component="span">
                  {alert.time}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
