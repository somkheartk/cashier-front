"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Grid,
  AppBar,
  Toolbar,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { apiService, type Product } from '@/services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' as 'success' | 'error' });
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    barcode: '',
    stock: '',
    tags: ''
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await apiService.getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);

      // Check if it's an authentication error
      if (error instanceof Error && error.message.includes('Authentication expired')) {
        setNotification({
          open: true,
          message: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่',
          type: 'error'
        });
        // Redirect will be handled by api.ts
        return;
      }

      setNotification({ open: true, message: 'เกิดข้อผิดพลาดในการโหลดสินค้า', type: 'error' });
      // แสดงข้อมูลตัวอย่างกรณี API ไม่ทำงาน
      setProducts([
        { id: '1', name: 'กาแฟสดใส่นม', price: 45, category: 'เครื่องดื่ม', stock: 50, barcode: '001' },
        { id: '2', name: 'ชาเขียวน้ำผึ้ง', price: 35, category: 'เครื่องดื่ม', stock: 30, barcode: '002' },
        { id: '3', name: 'ขนมปังทาเนย', price: 25, category: 'ขนม', stock: 20, barcode: '003' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // จำลองการดึงหมวดหมู่
      setCategories(['เครื่องดื่ม', 'ขนม', 'อาหาร', 'ของหวาน']);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      barcode: '',
      stock: '',
      tags: ''
    });
    setProductDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      barcode: product.barcode || '',
      stock: product.stock.toString(),
      tags: ''
    });
    setProductDialog(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialog(true);
  };

  const handleSaveProduct = async () => {
    try {
      setLoading(true);
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        barcode: formData.barcode,
        stock: parseInt(formData.stock),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (selectedProduct) {
        // อัปเดตสินค้า
        await apiService.updateProduct(selectedProduct.id, productData);
        setNotification({ open: true, message: 'อัปเดตสินค้าสำเร็จ', type: 'success' });
      } else {
        // เพิ่มสินค้าใหม่
        await apiService.createProduct(productData);
        setNotification({ open: true, message: 'เพิ่มสินค้าใหม่สำเร็จ', type: 'success' });
      }

      setProductDialog(false);
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      setNotification({ open: true, message: 'เกิดข้อผิดพลาดในการบันทึก', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      setLoading(true);
      await apiService.deleteProduct(selectedProduct.id);
      setNotification({ open: true, message: 'ลบสินค้าสำเร็จ', type: 'success' });
      setDeleteDialog(false);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setNotification({ open: true, message: 'เกิดข้อผิดพลาดในการลบ', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (product.barcode && product.barcode.includes(searchTerm));
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Avatar sx={{ mr: 2, backgroundColor: '#fff', color: '#1976d2' }}>
            📦
          </Avatar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }} className="thai-heading">
            จัดการสินค้า
          </Typography>
          
          <Button 
            color="inherit" 
            startIcon={<RefreshIcon />}
            onClick={loadProducts}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            รีเฟรช
          </Button>

          <Button 
            color="inherit" 
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            variant="outlined"
            sx={{ borderColor: 'white', color: 'white' }}
          >
            เพิ่มสินค้า
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Filter Controls */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="ค้นหาสินค้า (ชื่อ, บาร์โค้ด)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  className="thai-body"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>หมวดหมู่</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="หมวดหมู่"
                  >
                    <MenuItem value="all">ทั้งหมด</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" className="thai-heading" sx={{ mb: 2 }}>
              📋 รายการสินค้า ({filteredProducts.length} รายการ)
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </Box>
            ) : filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  ไม่พบสินค้า
                </Typography>
              </Box>
            ) : (
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
                    {filteredProducts.map((product) => (
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
                              onClick={() => handleEditProduct(product)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="ลบ">
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteProduct(product)}
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
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Add/Edit Product Dialog */}
      <Dialog 
        open={productDialog} 
        onClose={() => setProductDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle component="div">
          <Typography variant="h6" className="thai-heading">
            {selectedProduct ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="บาร์โค้ด"
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="คำอธิบาย"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>หมวดหมู่</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="แท็ก (คั่นด้วยจุลภาค)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="ร้อน, เย็น, หวาน"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialog(false)}>
            ยกเลิก
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveProduct}
            disabled={!formData.name || !formData.price || !formData.category || !formData.stock}
          >
            {selectedProduct ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialog} 
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>ยืนยันการลบสินค้า</DialogTitle>
        <DialogContent>
          <Typography className="thai-text">
            คุณแน่ใจหรือไม่ที่จะลบสินค้า "{selectedProduct?.name}" ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>
            ยกเลิก
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={confirmDeleteProduct}
          >
            ลบ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddProduct}
      >
        <AddIcon />
      </Fab>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.type} onClose={() => setNotification({ ...notification, open: false })}>
          <Typography className="thai-body">{notification.message}</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
}
