import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { Inventory, Add } from '@mui/icons-material';
import { Product } from '@/types/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: 200,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.08)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          borderColor: '#667eea'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        },
        '&:hover::before': {
          opacity: 1
        }
      }}
      onClick={() => onAddToCart(product)}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Product Image Placeholder */}
        <Box sx={{
          width: 60,
          height: 60,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          alignSelf: 'center'
        }}>
          <Inventory sx={{ color: 'white', fontSize: 30 }} />
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textAlign: 'center',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          {product.category}
        </Typography>

        <Box sx={{
          mt: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#2E7D32',
              fontSize: '1.2rem'
            }}
          >
            ฿{product.price}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`คงเหลือ ${product.stock}`}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                backgroundColor: product.stock > 10 ? '#E8F5E8' :
                               product.stock > 5 ? '#FFF3E0' : '#FFEBEE',
                color: product.stock > 10 ? '#2E7D32' :
                       product.stock > 5 ? '#E65100' : '#C62828'
              }}
            />
            <Add sx={{
              color: '#667eea',
              fontSize: 20,
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '50%',
              p: 0.5
            }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
