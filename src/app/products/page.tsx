"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  Snackbar,
  Alert,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { apiService } from '@/services/api';
import { Product } from '@/types';
import { ProductFilters, ProductsTable, ProductFormDialog, DeleteProductDialog } from '@/components/products';

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
        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Products Table */}
        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" className="thai-heading" sx={{ mb: 2 }}>
              📋 รายการสินค้า ({filteredProducts.length} รายการ)
            </Typography>

            <ProductsTable
              products={filteredProducts}
              loading={loading}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Add/Edit Product Dialog */}
      <ProductFormDialog
        open={productDialog}
        onClose={() => setProductDialog(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSaveProduct}
        categories={categories}
        isEditing={!!selectedProduct}
        loading={loading}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        product={selectedProduct}
        onConfirm={confirmDeleteProduct}
        loading={loading}
      />

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
