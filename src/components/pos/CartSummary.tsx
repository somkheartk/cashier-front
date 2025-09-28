import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { Payment } from '@mui/icons-material';

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  onPaymentClick: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  subtotal,
  discountPercent,
  discountAmount,
  totalAmount,
  onPaymentClick
}) => {
  return (
    <>
      <Divider sx={{ my: 2 }} />

      {/* Order Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
          สรุปคำสั่งซื้อ
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              จำนวนรายการ:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {totalItems} รายการ
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              ยอดรวม:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              ฿{subtotal.toFixed(2)}
            </Typography>
          </Box>

          {discountPercent > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="error">
                ส่วนลด ({discountPercent}%):
              </Typography>
              <Typography variant="body2" color="error" sx={{ fontWeight: 'medium' }}>
                -฿{discountAmount.toFixed(2)}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
              ยอดชำระทั้งสิ้น:
            </Typography>
            <Typography variant="h6" sx={{
              fontWeight: 'bold',
              color: '#2E7D32',
              fontSize: '1.3rem'
            }}>
              ฿{totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Payment Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<Payment />}
        onClick={onPaymentClick}
        sx={{
          borderRadius: 3,
          py: 2,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        ชำระเงิน (Enter)
      </Button>
    </>
  );
};
