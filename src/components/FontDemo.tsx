import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

export default function FontDemo() {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom className="thai-heading">
        🔤 ตัวอย่างฟอนต์ภาษาไทย
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" className="text-kanit" color="primary">
          ฟอนต์ Kanit: ระบบ POS สำหรับร้านค้าขายปลีก
        </Typography>
        <Typography variant="body2" className="text-kanit" color="text.secondary">
          ตัวอย่าง: ราคา ฿1,234.56 | จำนวน 123 ชิ้น | วันที่ 28/09/2568
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" className="text-sarabun" color="secondary">
          ฟอนต์ Sarabun: การจัดการสินค้าคงคลัง
        </Typography>
        <Typography variant="body2" className="text-sarabun" color="text.secondary">
          ตัวอย่าง: สินค้า ABC-001 | คงเหลือ 456 หน่วย | ราคาทุน ฿789.00
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" className="text-prompt" color="success.main">
          ฟอนต์ Prompt: รายงานยอดขายรายวัน
        </Typography>
        <Typography variant="body2" className="text-prompt" color="text.secondary">
          ตัวอย่าง: ยอดขาย ฿25,420.75 | ลูกค้า 89 คน | เฉลี่ย ฿285.74/บิล
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" className="thai-body">
        📌 หมายเหตุ: ระบบรองรับการแสดงผลภาษาไทยในทุกส่วนของแอปพลิเคชัน
      </Typography>
    </Paper>
  );
}
