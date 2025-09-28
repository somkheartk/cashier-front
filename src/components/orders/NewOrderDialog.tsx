import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography
} from '@mui/material';

interface NewOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NewOrderDialog({ open, onClose }: NewOrderDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>สร้างออเดอร์ใหม่</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body1" color="textSecondary">
            ฟีเจอร์นี้จะพัฒนาในเวอร์ชันถัดไป...
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button variant="contained">สร้างออเดอร์</Button>
      </DialogActions>
    </Dialog>
  );
}
