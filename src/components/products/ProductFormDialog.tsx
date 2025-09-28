import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  barcode: string;
  stock: string;
  tags: string;
}

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  formData: ProductFormData;
  onFormDataChange: (data: ProductFormData) => void;
  onSave: () => void;
  categories: string[];
  isEditing: boolean;
  loading: boolean;
}

export default function ProductFormDialog({
  open,
  onClose,
  formData,
  onFormDataChange,
  onSave,
  categories,
  isEditing,
  loading
}: ProductFormDialogProps) {
  const handleChange = (field: keyof ProductFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const isFormValid = formData.name && formData.price && formData.category && formData.stock;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle component="div">
        <Typography variant="h6" className="thai-heading">
          {isEditing ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ชื่อสินค้า"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="บาร์โค้ด"
                value={formData.barcode}
                onChange={(e) => handleChange('barcode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="คำอธิบาย"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="ราคา"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>หมวดหมู่</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  label="หมวดหมู่"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="จำนวนสต็อก"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="แท็ก (คั่นด้วยจุลภาค)"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="ร้อน, เย็น, หวาน"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={!isFormValid || loading}
        >
          {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
