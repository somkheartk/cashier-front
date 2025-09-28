import React from 'react';
import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { Inventory } from '@mui/icons-material';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/products';

interface ProductGridProps {
  loading: boolean;
  filteredProducts: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  loading,
  filteredProducts,
  onAddToCart
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress sx={{ color: '#667eea' }} />
      </Box>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'text.secondary'
      }}>
        <Inventory sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
        <Typography variant="h6" gutterBottom>ไม่พบสินค้า</Typography>
        <Typography variant="body2">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 2
    }}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </Box>
  );
};
