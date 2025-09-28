import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
import { Product } from '@/types/products';

interface CartItemData {
  product: Product;
  quantity: number;
  subtotal: number;
  discount?: number;
  notes?: string;
}

interface CartItemProps {
  item: CartItemData;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemoveFromCart,
  onUpdateQuantity
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderColor: '#667eea'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                fontSize: '0.95rem',
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {item.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ฿{item.product.price} × {item.quantity}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => onRemoveFromCart(item.product.id)}
            sx={{
              color: '#f44336',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.2)'
              }
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              sx={{
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.2)'
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  color: 'text.disabled'
                }
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography sx={{
              mx: 2,
              fontWeight: 'bold',
              minWidth: 30,
              textAlign: 'center'
            }}>
              {item.quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              sx={{
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.2)'
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  color: 'text.disabled'
                }
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#2E7D32',
              fontSize: '1.1rem'
            }}
          >
            ฿{item.subtotal.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
