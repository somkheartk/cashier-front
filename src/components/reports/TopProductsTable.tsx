import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  MoreVert,
  Refresh,
  FilterList
} from '@mui/icons-material';
import { TopProduct } from '@/types/reports';

interface TopProductsTableProps {
  products: TopProduct[];
  anchorEl: HTMLElement | null;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
}

export default function TopProductsTable({
  products,
  anchorEl,
  onMenuClick,
  onMenuClose
}: TopProductsTableProps) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            สินค้าขายดี
          </Typography>
          <IconButton onClick={onMenuClick}>
            <MoreVert />
          </IconButton>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>อันดับ</TableCell>
                <TableCell>ชื่อสินค้า</TableCell>
                <TableCell align="right">จำนวนขาย</TableCell>
                <TableCell align="right">รายได้</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <Chip
                      label={index + 1}
                      color={index < 3 ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">{product.sold}</TableCell>
                  <TableCell align="right">
                    ฿{product.revenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onMenuClose}>
          <Refresh sx={{ mr: 2 }} />
          รีเฟรชข้อมูล
        </MenuItem>
        <MenuItem onClick={onMenuClose}>
          <FilterList sx={{ mr: 2 }} />
          กรองข้อมูล
        </MenuItem>
      </Menu>
    </Card>
  );
}
