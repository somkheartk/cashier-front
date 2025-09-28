import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Product } from '@/services/api';

interface ProductsTableProps {
  products: Product[];
  loading: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export default function ProductsTable({
  products,
  loading,
  onEditProduct,
  onDeleteProduct
}: ProductsTableProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          ไม่พบสินค้า
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ flex: 1 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>บาร์โค้ด</TableCell>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>ชื่อสินค้า</TableCell>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>หมวดหมู่</TableCell>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>ราคา</TableCell>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>คงเหลือ</TableCell>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>สถานะ</TableCell>
            <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>การจัดการ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell className="thai-text">{product.barcode || '-'}</TableCell>
              <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>
                {product.name}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.category}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell className="thai-text" sx={{ fontWeight: 'bold' }}>
                ฿{product.price.toLocaleString()}
              </TableCell>
              <TableCell className="thai-text">
                <Chip
                  label={`${product.stock} ชิ้น`}
                  color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={product.stock > 0 ? 'มีสินค้า' : 'หมด'}
                  color={product.stock > 0 ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Tooltip title="แก้ไข">
                  <IconButton
                    size="small"
                    onClick={() => onEditProduct(product)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="ลบ">
                  <IconButton
                    size="small"
                    onClick={() => onDeleteProduct(product)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
