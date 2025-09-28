import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode?: string;
  description?: string;
}

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: () => void;
  loading: boolean;
}

export default function DeleteProductDialog({
  open,
  onClose,
  product,
  onConfirm,
  loading
}: DeleteProductDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>ยืนยันการลบสินค้า</DialogTitle>
      <DialogContent>
        <Typography className="thai-text">
          คุณแน่ใจหรือไม่ที่จะลบสินค้า "{product?.name}" ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
        >
          ลบ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
