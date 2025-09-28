'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Chip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Avatar,
  Snackbar,
  Alert,
  Fab,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  InputAdornment,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  MonetizationOn,
  Inventory,
  TrendingUp,
  Add,
  Remove,
  Delete,
  Search,
  Payment,
  Receipt,
  ExpandMore,
  Keyboard,
  QrCode,
  CreditCard,
  AccountBalanceWallet,
  Print,
  Share,
  Refresh,
  Clear,
  Calculate,
  LocalOffer,
  Category,
  FilterList,
  ViewList,
  ViewModule,
  Brightness4,
  Brightness7,
  PointOfSale,
  People,
  CheckCircle
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { ProductCard, SearchAndFilters, ProductGrid, CartItem, CartSummary } from '../../components/pos';
import { Product, CartItemData, PaymentMethod, CompletedOrder } from '@/types';

export default function POSPage() {
  const router = useRouter();
  const theme = useTheme();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItemData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');

  // Payment states
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Receipt and order history
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<CompletedOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<CompletedOrder[]>([]);

  // UI states
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' as 'success' | 'error' | 'info' });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(false);
  const [orderHistoryDialog, setOrderHistoryDialog] = useState(false);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    { id: 'cash', name: 'เงินสด', icon: <AccountBalanceWallet />, color: '#4CAF50' },
    { id: 'card', name: 'บัตรเครดิต', icon: <CreditCard />, color: '#2196F3' },
    { id: 'qr', name: 'QR Code', icon: <QrCode />, color: '#FF9800' },
    { id: 'transfer', name: 'โอนเงิน', icon: <AccountBalanceWallet />, color: '#9C27B0' }
  ];

  // Load products with enhanced data
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Enhanced mock data with more details
      const mockProducts: Product[] = [
        { id: '1', name: 'กาแฟดำร้อน', price: 35, category: 'เครื่องดื่มร้อน', stock: 20, barcode: '1001', description: 'กาแฟดำแท้ 100%' },
        { id: '2', name: 'กาแฟนมร้อน', price: 45, category: 'เครื่องดื่มร้อน', stock: 15, barcode: '1002', description: 'กาแฟนมสูตรพิเศษ' },
        { id: '3', name: 'ชาเขียวมัทฉะ', price: 55, category: 'เครื่องดื่มร้อน', stock: 12, barcode: '1003', description: 'ชาเขียวญี่ปุ่นแท้' },
        { id: '4', name: 'ลาเต้ชาไทย', price: 50, category: 'เครื่องดื่มร้อน', stock: 18, barcode: '1004', description: 'ลาเต้สูตรไทย' },
        { id: '5', name: 'น้ำส้มสด', price: 40, category: 'เครื่องดื่มเย็น', stock: 25, barcode: '2001', description: 'น้ำส้มสดคั้นใหม่' },
        { id: '6', name: 'ชานมเย็น', price: 35, category: 'เครื่องดื่มเย็น', stock: 22, barcode: '2002', description: 'ชานมเย็นสูตรเย็น' },
        { id: '7', name: 'ขนมปังสังขยา', price: 25, category: 'ขนม', stock: 15, barcode: '3001', description: 'ขนมปังสังขยาโฮมเมด' },
        { id: '8', name: 'ครัวซองต์', price: 30, category: 'ขนม', stock: 12, barcode: '3002', description: 'ครัวซองต์เนยสด' },
        { id: '9', name: 'เค้กช็อกโกแลต', price: 85, category: 'ขนม', stock: 8, barcode: '3003', description: 'เค้กช็อกโกแลต 3 ชั้น' },
        { id: '10', name: 'แซนด์วิชไก่', price: 75, category: 'อาหาร', stock: 10, barcode: '4001', description: 'แซนด์วิชไก่ย่าง' },
        { id: '11', name: 'สลัดผัก', price: 65, category: 'อาหาร', stock: 14, barcode: '4002', description: 'สลัดผักสดรวม' },
        { id: '12', name: 'โยเกิร์ตกรีก', price: 45, category: 'ของหวาน', stock: 20, barcode: '5001', description: 'โยเกิร์ตกรีกแท้' }
      ];

      setProducts(mockProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
      setNotification({ open: true, message: 'ไม่สามารถโหลดสินค้าได้', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Enhanced calculations
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.subtotal, 0), [cart]);
  const discountAmount = useMemo(() => (subtotal * discountPercent) / 100, [subtotal, discountPercent]);
  const totalAmount = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const change = useMemo(() => cashAmount ? Math.max(0, parseFloat(cashAmount) - totalAmount) : 0, [cashAmount, totalAmount]);

  // Enhanced filtering and sorting
  const categories = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  // Enhanced filtering and sorting
  const filteredAndSortedProducts = useMemo(() => products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.barcode?.includes(searchTerm);
      const matchesCategory = selectedCategory === 'ทั้งหมด' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    }), [products, searchTerm, selectedCategory, sortBy]);

  const filteredProducts = filteredAndSortedProducts;

  // Enhanced cart functions
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    if (product.stock <= 0) {
      setNotification({ open: true, message: 'สินค้าหมดสต็อก', type: 'error' });
      return;
    }

    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        setNotification({ open: true, message: 'จำนวนสินค้าเกินสต็อกที่มี', type: 'error' });
        return;
      }

      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.product.price }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity, subtotal: quantity * product.price }]);
    }

    setNotification({ open: true, message: `เพิ่ม ${product.name} ลงตะกร้าแล้ว`, type: 'success' });
  }, [cart]);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.product.id !== productId));
      return;
    }

    const item = cart.find(item => item.product.id === productId);
    if (item && newQuantity > item.product.stock) {
      setNotification({ open: true, message: 'จำนวนสินค้าเกินสต็อกที่มี', type: 'error' });
      return;
    }

    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.product.price }
        : item
    ));
  }, [cart]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
    setNotification({ open: true, message: 'ลบสินค้าออกจากตะกร้าแล้ว', type: 'info' });
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setDiscountPercent(0);
    setNotification({ open: true, message: 'เคลียร์ตะกร้าสินค้าแล้ว', type: 'info' });
  }, []);

  // Enhanced payment processing
  const processPayment = useCallback(async () => {
    if (cart.length === 0) return;

    const paymentAmount = selectedPaymentMethod === 'cash' ? parseFloat(cashAmount) : totalAmount;

    if (selectedPaymentMethod === 'cash' && paymentAmount < totalAmount) {
      setNotification({ open: true, message: 'จำนวนเงินไม่เพียงพอ', type: 'error' });
      return;
    }

    try {
      // Create order
      const order: CompletedOrder = {
        id: `ORD-${Date.now()}`,
        items: cart,
        total: totalAmount,
        paymentMethod: selectedPaymentMethod,
        cashReceived: paymentAmount,
        change: selectedPaymentMethod === 'cash' ? paymentAmount - totalAmount : 0,
        timestamp: new Date(),
        customerName: customerName || undefined
      };

      // Save to order history
      setOrderHistory(prev => [order, ...prev]);

      // Clear cart and close dialogs
      setCart([]);
      setPaymentDialog(false);
      setShowReceipt(true);
      setCashAmount('');
      setCustomerName('');
      setDiscountPercent(0);
      setCurrentOrder(order);

      setNotification({ open: true, message: 'ชำระเงินสำเร็จ!', type: 'success' });
    } catch (error) {
      console.error('Payment processing error:', error);
      setNotification({ open: true, message: 'เกิดข้อผิดพลาดในการชำระเงิน', type: 'error' });
    }
  }, [cart, totalAmount, selectedPaymentMethod, cashAmount, customerName, discountPercent]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'p':
            event.preventDefault();
            setPaymentDialog(true);
            break;
          case 'c':
            event.preventDefault();
            clearCart();
            break;
          case 'f':
            event.preventDefault();
            searchInputRef.current?.focus();
            break;
          case 'h':
            event.preventDefault();
            setOrderHistoryDialog(true);
            break;
        }
      }

      // Number keys for quick product selection
      if (!isNaN(Number(event.key)) && Number(event.key) >= 1 && Number(event.key) <= 9) {
        const index = Number(event.key) - 1;
        if (filteredProducts[index]) {
          addToCart(filteredProducts[index]);
        }
      }

      // Enter key for payment
      if (event.key === 'Enter' && paymentDialog) {
        processPayment();
      }

      // Escape key to close dialogs
      if (event.key === 'Escape') {
        setPaymentDialog(false);
        setOrderHistoryDialog(false);
        setShowReceipt(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [filteredProducts, addToCart, clearCart, processPayment, paymentDialog]);

  // Print receipt
  const printReceipt = useCallback(() => {
    if (!currentOrder) return;

    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) return;

    const receiptHTML = `
      <html>
        <head>
          <title>ใบเสร็จรับเงิน</title>
          <style>
            body { font-family: 'Courier New', monospace; font-size: 12px; max-width: 300px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { border-top: 1px solid #000; padding-top: 10px; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>ร้านค้า POS</h2>
            <p>ใบเสร็จรับเงิน</p>
            <p>วันที่: ${currentOrder.timestamp.toLocaleDateString('th-TH')}</p>
            <p>เวลา: ${currentOrder.timestamp.toLocaleTimeString('th-TH')}</p>
          </div>

          ${currentOrder.customerName ? `<p>ลูกค้า: ${currentOrder.customerName}</p>` : ''}

          <div class="items">
            ${currentOrder.items.map(item => `
              <div class="item">
                <span>${item.product.name} x${item.quantity}</span>
                <span>${item.subtotal.toFixed(2)} บาท</span>
              </div>
            `).join('')}
          </div>

          <div class="total">
            <div class="item">
              <span>รวมทั้งสิ้น:</span>
              <span>${currentOrder.total.toFixed(2)} บาท</span>
            </div>
            <div class="item">
              <span>ชำระโดย: ${currentOrder.paymentMethod === 'cash' ? 'เงินสด' : 'บัตรเครดิต'}</span>
              <span>${currentOrder.cashReceived.toFixed(2)} บาท</span>
            </div>
            ${currentOrder.change > 0 ? `
              <div class="item">
                <span>เงินทอน:</span>
                <span>${currentOrder.change.toFixed(2)} บาท</span>
              </div>
            ` : ''}
          </div>

          <div class="footer">
            <p>ขอบคุณที่ใช้บริการ</p>
            <p>POS System v2.0</p>
          </div>
        </body>
      </html>
    `;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    receiptWindow.print();
  }, [currentOrder]);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 2,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.1
      }
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Enhanced Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 300,
              height: 300,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <IconButton
                  onClick={() => router.push('/')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    width: 56,
                    height: 56,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ArrowBack />
                </IconButton>

                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <PointOfSale sx={{ fontSize: 40 }} />
                    Point of Sale
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
                    ระบบขายหน้าร้านอัจฉริยะ - จัดการการขายและรับชำระเงินอย่างมืออาชีพ
                  </Typography>
                </Box>
              </Box>

              {/* Enhanced Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip title="ประวัติการขาย (Ctrl+H)">
                  <IconButton
                    onClick={() => setOrderHistoryDialog(true)}
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#667eea',
                      width: 48,
                      height: 48,
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.1)',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Receipt />
                  </IconButton>
                </Tooltip>

                <Tooltip title="เคลียร์ตะกร้า (Ctrl+C)">
                  <IconButton
                    onClick={clearCart}
                    disabled={cart.length === 0}
                    sx={{
                      background: cart.length > 0 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255,255,255,0.1)',
                      color: cart.length > 0 ? '#f44336' : '#999',
                      width: 48,
                      height: 48,
                      border: '1px solid rgba(244, 67, 54, 0.2)',
                      '&:hover': {
                        background: cart.length > 0 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255,255,255,0.1)',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Clear />
                  </IconButton>
                </Tooltip>

                <Tooltip title="คีย์ลัด (F1)">
                  <IconButton
                    onClick={() => setKeyboardShortcuts(true)}
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ff9800',
                      width: 48,
                      height: 48,
                      border: '1px solid rgba(255, 152, 0, 0.2)',
                      '&:hover': {
                        background: 'rgba(255, 152, 0, 0.1)',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Keyboard />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Quick Stats Bar */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                background: 'rgba(76, 175, 80, 0.1)',
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid rgba(76, 175, 80, 0.2)'
              }}>
                <ShoppingCart sx={{ color: '#4CAF50' }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                  {totalItems} รายการในตะกร้า
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                background: 'rgba(33, 150, 243, 0.1)',
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid rgba(33, 150, 243, 0.2)'
              }}>
                <MonetizationOn sx={{ color: '#2196F3' }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1565C0' }}>
                  ยอดรวม: ฿{totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                background: 'rgba(255, 152, 0, 0.1)',
                px: 2,
                py: 1,
                borderRadius: 2,
                border: '1px solid rgba(255, 152, 0, 0.2)'
              }}>
                <Inventory sx={{ color: '#FF9800' }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#E65100' }}>
                  {filteredProducts.length} สินค้า
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Enhanced Main Content */}
        <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 280px)' }}>
          {/* Left Side - Enhanced Products */}
          <Box sx={{ flex: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 200,
                  height: 200,
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(139, 195, 74, 0.05) 100%)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)'
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Enhanced Search and Filters */}
                <SearchAndFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  searchInputRef={searchInputRef}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                {/* Enhanced Products Grid */}
                <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
                  <ProductGrid
                    loading={loading}
                    filteredProducts={filteredProducts}
                    onAddToCart={addToCart}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Right Side - Enhanced Cart */}
          <Box sx={{ flex: 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 200,
                  height: 200,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)'
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#667eea',
                    mb: 2
                  }}
                >
                  <ShoppingCart />
                  ตะกร้าสินค้า
                  {totalItems > 0 && (
                    <Badge
                      badgeContent={totalItems}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white'
                        }
                      }}
                    />
                  )}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Enhanced Cart Items */}
                <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
                  {cart.length === 0 ? (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      color: 'text.secondary',
                      textAlign: 'center'
                    }}>
                      <ShoppingCart sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                        ตะกร้าว่างเปล่า
                      </Typography>
                      <Typography variant="body2">
                        คลิกที่สินค้าเพื่อเพิ่มเข้าตะกร้า
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {cart.map((item) => (
                        <CartItem
                          key={item.product.id}
                          item={item}
                          onRemoveFromCart={removeFromCart}
                          onUpdateQuantity={updateQuantity}
                        />
                      ))}
                    </Box>
                  )}
                </Box>

                {/* Enhanced Total and Payment */}
                {cart.length > 0 && (
                  <CartSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    discountPercent={discountPercent}
                    discountAmount={discountAmount}
                    totalAmount={totalAmount}
                    onPaymentClick={() => setPaymentDialog(true)}
                  />
                )}
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Enhanced Payment Dialog */}
        <Dialog
          open={paymentDialog}
          onClose={() => setPaymentDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }
          }}
        >
          <DialogTitle sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            py: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 100,
              height: 100,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(30%, -30%)'
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Payment sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
              <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', display: 'block' }}>
                ชำระเงิน
              </Typography>
              <Typography variant="h6" component="span" sx={{ opacity: 0.9, mt: 1, display: 'block' }}>
                ยอดรวม: ฿{totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 4 }}>
            {/* Order Summary */}
            <Card elevation={0} sx={{
              mb: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Receipt sx={{ fontSize: 24 }} />
                  สรุปคำสั่งซื้อ
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {cart.map((item) => (
                    <Box key={item.product.id} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: '1px solid rgba(0,0,0,0.08)'
                    }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ฿{item.product.price} × {item.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        ฿{item.subtotal.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ยอดรวมทั้งสิ้น:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    ฿{totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea', mb: 2 }}>
                เลือกวิธีการชำระเงิน
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 3,
                      border: selectedPaymentMethod === method.id ? '2px solid #667eea' : '1px solid rgba(0,0,0,0.12)',
                      background: selectedPaymentMethod === method.id ?
                        'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' :
                        'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        borderColor: '#667eea'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Box sx={{
                        color: selectedPaymentMethod === method.id ? method.color : 'text.secondary',
                        mb: 1,
                        fontSize: 32,
                        transition: 'color 0.3s ease'
                      }}>
                        {method.icon}
                      </Box>
                      <Typography variant="body1" sx={{
                        fontWeight: selectedPaymentMethod === method.id ? 'bold' : 'medium',
                        color: selectedPaymentMethod === method.id ? method.color : 'text.primary'
                      }}>
                        {method.name}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Customer Name and Discount */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
              <TextField
                fullWidth
                label="ชื่อลูกค้า (ไม่บังคับ)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                InputProps={{
                  startAdornment: <People sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea'
                      }
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                        borderWidth: 2
                      }
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                label="ส่วนลด (%)"
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                inputProps={{ min: 0, max: 100 }}
                InputProps={{
                  startAdornment: <LocalOffer sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea'
                      }
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                        borderWidth: 2
                      }
                    }
                  }
                }}
              />
            </Box>

            {/* Cash Amount Input */}
            {selectedPaymentMethod === 'cash' && (
              <Card elevation={0} sx={{
                mb: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalanceWallet sx={{ fontSize: 24 }} />
                    ชำระด้วยเงินสด
                  </Typography>

                  <TextField
                    fullWidth
                    label="จำนวนเงินที่รับ"
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    inputProps={{ min: totalAmount, step: 0.01 }}
                    sx={{
                      mt: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4CAF50'
                          }
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4CAF50',
                            borderWidth: 2
                          }
                        }
                      }
                    }}
                  />

                  {cashAmount && parseFloat(cashAmount) >= totalAmount && (
                    <Box sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(76, 175, 80, 0.1)',
                      border: '1px solid rgba(76, 175, 80, 0.3)'
                    }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                        เงินทอน: ฿{(parseFloat(cashAmount) - totalAmount).toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Final Total */}
            <Card elevation={0} sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: 100,
                height: 100,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(30%, -30%)'
              }
            }}>
              <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ยอดชำระทั้งสิ้น
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                    ฿{totalAmount.toFixed(2)}
                  </Typography>
                  {discountPercent > 0 && (
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      ส่วนลด {discountPercent}% จาก ฿{subtotal.toFixed(2)}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </DialogContent>

          <DialogActions sx={{ p: 4, pt: 2 }}>
            <Button
              onClick={() => setPaymentDialog(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={processPayment}
              variant="contained"
              disabled={
                (selectedPaymentMethod === 'cash' && (!cashAmount || parseFloat(cashAmount) < totalAmount))
              }
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'white',
                color: '#667eea',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                },
                '&:disabled': {
                  background: 'rgba(255,255,255,0.5)',
                  color: 'rgba(102, 126, 234, 0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Payment sx={{ mr: 1 }} />
              ยืนยันการชำระเงิน
            </Button>
          </DialogActions>
        </Dialog>

        {/* Order History Dialog */}
        <Dialog open={orderHistoryDialog} onClose={() => setOrderHistoryDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>ประวัติการขาย</DialogTitle>
          <DialogContent>
            {orderHistory.length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                ยังไม่มีประวัติการขาย
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {orderHistory.map((order) => (
                  <Card key={order.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                        <Typography variant="h6">{order.id}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.timestamp.toLocaleString('th-TH')}
                        </Typography>
                      </Box>

                      {order.customerName && (
                        <Typography variant="body2" color="primary" gutterBottom>
                          ลูกค้า: {order.customerName}
                        </Typography>
                      )}

                      <Box sx={{ mb: 1 }}>
                        {order.items.map((item) => (
                          <Typography key={item.product.id} variant="body2">
                            {item.product.name} x{item.quantity} = ฿{item.subtotal}
                          </Typography>
                        ))}
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2">
                          รวม: ฿{order.total} ({order.paymentMethod === 'cash' ? 'เงินสด' : 'บัตรเครดิต'})
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setCurrentOrder(order);
                            setShowReceipt(true);
                            setOrderHistoryDialog(false);
                          }}
                        >
                          ดูใบเสร็จ
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOrderHistoryDialog(false)}>ปิด</Button>
          </DialogActions>
        </Dialog>

        {/* Enhanced Receipt Dialog */}
        <Dialog
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }
          }}
        >
          <DialogTitle sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
            color: 'white',
            textAlign: 'center',
            py: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 80,
              height: 80,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              transform: 'translate(20%, -20%)'
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <CheckCircle sx={{ fontSize: 48, mb: 1, color: 'white' }} />
              <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', display: 'block' }}>
                ชำระเงินสำเร็จ!
              </Typography>
              <Typography variant="h6" component="span" sx={{ opacity: 0.9, mt: 1, display: 'block' }}>
                ใบเสร็จรับเงิน
              </Typography>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 4 }}>
            {currentOrder && (
              <Card elevation={0} sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Receipt Header */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32', mb: 1 }}>
                      🏪 ร้านค้า POS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ระบบจุดขายสำหรับร้านค้าขนาดเล็ก
                    </Typography>
                  </Box>

                  {/* Receipt Details */}
                  <Box sx={{ mb: 3, p: 2, background: 'white', borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">เลขที่ใบเสร็จ:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{currentOrder.id}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">วันที่:</Typography>
                      <Typography variant="body2">{currentOrder.timestamp.toLocaleDateString('th-TH')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">เวลา:</Typography>
                      <Typography variant="body2">{currentOrder.timestamp.toLocaleTimeString('th-TH')}</Typography>
                    </Box>
                    {currentOrder.customerName && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">ลูกค้า:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{currentOrder.customerName}</Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Items */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingCart sx={{ fontSize: 20 }} />
                    รายการสินค้า
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {currentOrder.items.map((item) => (
                      <Box key={item.product.id} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.5,
                        px: 2,
                        mb: 1,
                        background: 'white',
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.05)',
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.02)'
                        }
                      }}>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ฿{item.product.price.toFixed(2)} × {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                          ฿{item.subtotal.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Totals */}
                  <Box sx={{ p: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 2, color: 'white' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">รวมทั้งสิ้น:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        ฿{currentOrder.total.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">ชำระโดย:</Typography>
                      <Typography variant="body1">
                        {currentOrder.paymentMethod === 'cash' ? '💰 เงินสด' :
                         currentOrder.paymentMethod === 'card' ? '💳 บัตรเครดิต' :
                         currentOrder.paymentMethod === 'qr' ? '📱 QR Code' : '🏦 โอนเงิน'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">รับเงิน:</Typography>
                      <Typography variant="body1">
                        ฿{currentOrder.cashReceived.toFixed(2)}
                      </Typography>
                    </Box>
                    {currentOrder.change > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>เงินทอน:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                          ฿{currentOrder.change.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Thank You Message */}
                  <Box sx={{ textAlign: 'center', mt: 3, p: 2, background: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32', mb: 1 }}>
                      🙏 ขอบคุณที่ใช้บริการ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      POS System v2.0 - ระบบขายหน้าร้านอัจฉริยะ
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 4, pt: 2, justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={() => setShowReceipt(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5a6fd8',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)'
                }
              }}
            >
              ปิด
            </Button>
            {currentOrder && (
              <Button
                variant="contained"
                onClick={printReceipt}
                startIcon={<Print />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #388E3C 0%, #43A047 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                พิมพ์ใบเสร็จ
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Keyboard Shortcuts Dialog */}
        <Dialog open={keyboardShortcuts} onClose={() => setKeyboardShortcuts(false)} maxWidth="sm" fullWidth>
          <DialogTitle>คีย์ลัด</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>คีย์ลัดหลัก</Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>ชำระเงิน</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Ctrl + P</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>เคลียร์ตะกร้า</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Ctrl + C</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>ค้นหาสินค้า</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Ctrl + F</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>ประวัติการขาย</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Ctrl + H</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>เลือกสินค้า</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>1-9</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>ปิดหน้าต่าง</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Esc</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography>ยืนยันการชำระเงิน</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Enter</Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary">
              คีย์ลัดเหล่านี้ช่วยให้การทำงานรวดเร็วและมีประสิทธิภาพมากขึ้น
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setKeyboardShortcuts(false)}>ปิด</Button>
          </DialogActions>
        </Dialog>

        {/* Notification */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert severity={notification.type} onClose={() => setNotification({ ...notification, open: false })}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
