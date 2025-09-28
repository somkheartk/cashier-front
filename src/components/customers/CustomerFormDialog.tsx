import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipLevel: 'bronze' | 'silver' | 'gold';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  avatar?: string;
}

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  membershipLevel: Customer['membershipLevel'];
}

interface CustomerFormDialogProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
  formData: CustomerFormData;
  onFormDataChange: (data: CustomerFormData) => void;
  onSave: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export default function CustomerFormDialog({
  open,
  onClose,
  customer,
  formData,
  onFormDataChange,
  onSave,
  formatCurrency,
  formatDate
}: CustomerFormDialogProps) {
  const isEditing = !!customer;
  const isFormValid = formData.name && formData.email && formData.phone;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {isEditing ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มลูกค้าใหม่'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="body2" color="textSecondary" mb={1}>ชื่อลูกค้า</Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) => onFormDataChange({...formData, name: e.target.value})}
                placeholder="กรุณาใส่ชื่อลูกค้า"
              />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary" mb={1}>เบอร์โทรศัพท์</Typography>
              <TextField
                fullWidth
                value={formData.phone}
                onChange={(e) => onFormDataChange({...formData, phone: e.target.value})}
                placeholder="กรุณาใส่เบอร์โทรศัพท์"
              />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="body2" color="textSecondary" mb={1}>อีเมล</Typography>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => onFormDataChange({...formData, email: e.target.value})}
                placeholder="กรุณาใส่อีเมล"
              />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary" mb={1}>ระดับสมาชิก</Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.membershipLevel}
                  onChange={(e) => onFormDataChange({...formData, membershipLevel: e.target.value as Customer['membershipLevel']})}
                >
                  <MenuItem value="bronze">บรอนซ์</MenuItem>
                  <MenuItem value="silver">ซิลเวอร์</MenuItem>
                  <MenuItem value="gold">โกลด์</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {isEditing && customer && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>ข้อมูลเพิ่มเติม</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {customer.totalOrders}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    จำนวนออร์เดอร์
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {formatCurrency(customer.totalSpent)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ยอดรวมทั้งหมด
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {formatDate(customer.lastOrderDate)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ออร์เดอร์ล่าสุด
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
        >
          ยกเลิก
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          disabled={!isFormValid}
        >
          {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มลูกค้า'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
