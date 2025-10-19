# 👨‍💻 Development Guide - คู่มือนักพัฒนา

คู่มือนี้มีไว้สำหรับนักพัฒนาที่ต้องการเข้ามาช่วยพัฒนาหรือปรับแต่งระบบ Cashier Front

## 📋 สารบัญ

- [การเตรียมสภาพแวดล้อม](#การเตรียมสภาพแวดล้อม)
- [Coding Standards](#coding-standards)
- [การเพิ่มฟีเจอร์ใหม่](#การเพิ่มฟีเจอร์ใหม่)
- [การทำงานกับ Components](#การทำงานกับ-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling Guidelines](#styling-guidelines)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)

## การเตรียมสภาพแวดล้อม

### 1. ติดตั้ง Tools ที่จำเป็น

```bash
# Node.js 20.x or higher
node --version

# npm, yarn, pnpm, หรือ bun
npm --version
```

### 2. Clone และ Setup Project

```bash
# Clone repository
git clone https://github.com/somkheartk/cashier-front.git
cd cashier-front

# ติดตั้ง dependencies
npm install

# สร้าง .env.local
cp .env.example .env.local

# เริ่ม development server
npm run dev
```

### 3. IDE Setup (แนะนำ VS Code)

**Extensions ที่แนะนำ:**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

**VS Code Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Coding Standards

### TypeScript

#### 1. Type Definitions
ให้ใช้ interfaces และ types อย่างชัดเจน:

```typescript
// ✅ Good
interface User {
  id: number;
  username: string;
  name: string;
  roles: string[];
}

// ❌ Avoid
const user: any = { ... };
```

#### 2. Props Types
กำหนด type สำหรับ component props:

```typescript
// ✅ Good
interface CardProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

function Card({ title, subtitle, onClose }: CardProps) {
  // ...
}
```

#### 3. Avoid `any`
พยายามหลีกเลี่ยงการใช้ `any`:

```typescript
// ❌ Avoid
function processData(data: any) { ... }

// ✅ Good
function processData(data: Order[] | Customer[]) { ... }

// Or use generics
function processData<T>(data: T[]) { ... }
```

### React Best Practices

#### 1. Functional Components
ใช้ functional components แทน class components:

```typescript
// ✅ Good
function MyComponent({ name }: { name: string }) {
  return <div>{name}</div>;
}

// ❌ Avoid
class MyComponent extends React.Component { ... }
```

#### 2. Hooks Rules
- เรียก hooks ที่ top level เท่านั้น
- เรียก hooks ใน React functions เท่านั้น

```typescript
// ✅ Good
function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // effect logic
  }, []);
  
  return <div>{count}</div>;
}

// ❌ Avoid
function MyComponent() {
  if (condition) {
    const [count, setCount] = useState(0); // ❌ Conditional hook
  }
}
```

#### 3. Component Organization
จัดเรียง code ใน component ตามลำดับ:

```typescript
function MyComponent({ prop1, prop2 }: Props) {
  // 1. Hooks
  const [state, setState] = useState();
  const { user } = useAuth();
  
  // 2. Derived values
  const computedValue = useMemo(() => {
    return state * 2;
  }, [state]);
  
  // 3. Effects
  useEffect(() => {
    // side effects
  }, []);
  
  // 4. Event handlers
  const handleClick = () => {
    setState(newValue);
  };
  
  // 5. Render helpers
  const renderItem = (item: Item) => {
    return <div>{item.name}</div>;
  };
  
  // 6. Return JSX
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### File Naming

```
Components:     PascalCase.tsx    (e.g., OrderCard.tsx)
Pages:          page.tsx          (Next.js convention)
Utilities:      camelCase.ts      (e.g., formatDate.ts)
Types:          PascalCase.ts     (e.g., OrderTypes.ts)
Contexts:       PascalCase.tsx    (e.g., AuthContext.tsx)
```

### Import Order

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { Box, Typography, Button } from '@mui/material';
import { format } from 'date-fns';

// 3. Local imports
import { useAuth } from '@/contexts/AuthContext';
import { OrderCard } from '@/components/OrderCard';
import type { Order } from '@/types';
```

## การเพิ่มฟีเจอร์ใหม่

### 1. เพิ่มหน้าใหม่

**ขั้นตอน:**

1. สร้างโฟลเดอร์ใหม่ใน `src/app/`
2. สร้างไฟล์ `page.tsx`
3. เพิ่มเมนูใน `AdminLayout.tsx`

**ตัวอย่าง: เพิ่มหน้า Products**

```bash
# สร้างโฟลเดอร์
mkdir src/app/products
```

```typescript
// src/app/products/page.tsx
"use client";

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          จัดการสินค้า
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          เพิ่มสินค้า
        </Button>
      </Box>
      
      {/* Content */}
    </Box>
  );
}
```

```typescript
// เพิ่มใน src/components/AdminLayout.tsx
const menuItems = [
  // ... existing items
  {
    text: 'สินค้า',
    icon: 'inventory',
    path: '/products',
    roles: ['admin', 'manager']
  }
];
```

### 2. เพิ่ม Component ใหม่

**Template สำหรับ Component:**

```typescript
// src/components/ProductCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface ProductCardProps {
  name: string;
  price: number;
  stock: number;
  onEdit?: () => void;
}

export function ProductCard({ name, price, stock, onEdit }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography>ราคา: ฿{price}</Typography>
        <Typography>คงเหลือ: {stock}</Typography>
      </CardContent>
    </Card>
  );
}
```

### 3. เพิ่ม API Endpoint

**สร้าง API Service:**

```typescript
// src/services/productService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7800';

export const productService = {
  async getAll() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async create(product: CreateProductDto) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async update(id: number, product: UpdateProductDto) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async delete(id: number) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  }
};
```

**ใช้งานใน Component:**

```typescript
import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* Render products */}</div>;
}
```

## การทำงานกับ Components

### Material-UI Components

#### Basic Usage

```typescript
import { 
  Box, 
  Typography, 
  Button, 
  TextField 
} from '@mui/material';

function MyForm() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ฟอร์มตัวอย่าง
      </Typography>
      
      <TextField
        fullWidth
        label="ชื่อ"
        margin="normal"
      />
      
      <Button variant="contained" sx={{ mt: 2 }}>
        บันทึก
      </Button>
    </Box>
  );
}
```

#### Responsive Design

```typescript
<Box sx={{
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',           // Mobile: 1 column
    sm: 'repeat(2, 1fr)', // Tablet: 2 columns
    md: 'repeat(3, 1fr)', // Desktop: 3 columns
  },
  gap: 2
}}>
  {/* Grid items */}
</Box>
```

#### Theme Colors

```typescript
<Typography color="primary.main">Primary</Typography>
<Typography color="secondary.main">Secondary</Typography>
<Typography color="error.main">Error</Typography>
<Typography color="warning.main">Warning</Typography>
<Typography color="info.main">Info</Typography>
<Typography color="success.main">Success</Typography>
```

### Dialog Pattern

```typescript
function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        เปิด Dialog
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ชื่อ Dialog</DialogTitle>
        <DialogContent>
          {/* Content */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ยกเลิก</Button>
          <Button variant="contained">ยืนยัน</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### Table Pattern

```typescript
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><strong>ชื่อ</strong></TableCell>
        <TableCell><strong>ราคา</strong></TableCell>
        <TableCell align="center"><strong>จัดการ</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.id} hover>
          <TableCell>{item.name}</TableCell>
          <TableCell>฿{item.price}</TableCell>
          <TableCell align="center">
            <IconButton onClick={() => handleEdit(item)}>
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

## State Management

### Local State (useState)

```typescript
// Simple state
const [count, setCount] = useState(0);

// Object state
const [form, setForm] = useState({
  name: '',
  email: ''
});

// Update object state
const updateField = (field: string, value: any) => {
  setForm(prev => ({ ...prev, [field]: value }));
};
```

### Context API

**สร้าง Context ใหม่:**

```typescript
// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
```

**ใช้งาน Context:**

```typescript
function MyComponent() {
  const { items, addItem } = useCart();
  
  return (
    <div>
      <p>Items in cart: {items.length}</p>
      <button onClick={() => addItem({ id: 1, name: 'Product', quantity: 1 })}>
        Add to Cart
      </button>
    </div>
  );
}
```

## API Integration

### Fetch Pattern with Error Handling

```typescript
async function fetchData() {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_URL}/endpoint`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Fetch error:', error);
    setError(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
}
```

### POST Request with Authentication

```typescript
async function createResource(data: any) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create resource');
  }

  return response.json();
}
```

## Styling Guidelines

### MUI sx Prop

```typescript
<Box
  sx={{
    p: 3,              // padding: 24px
    m: 2,              // margin: 16px
    bgcolor: 'primary.main',
    borderRadius: 1,   // 4px
    boxShadow: 2,      // elevation 2
  }}
>
  Content
</Box>
```

### Responsive Styles

```typescript
<Typography
  variant="h4"
  sx={{
    fontSize: {
      xs: '1.5rem',  // Mobile
      sm: '2rem',    // Tablet
      md: '2.5rem',  // Desktop
    }
  }}
>
  Responsive Text
</Typography>
```

### Tailwind CSS

```typescript
<div className="p-4 bg-blue-500 rounded-lg">
  Content
</div>
```

## Testing

### Manual Testing Checklist

เมื่อเพิ่มฟีเจอร์ใหม่ ควรทดสอบ:

- [ ] ใช้งานได้บน Desktop
- [ ] ใช้งานได้บน Mobile (Responsive)
- [ ] Loading states แสดงถูกต้อง
- [ ] Error handling ทำงาน
- [ ] Form validation ทำงาน
- [ ] ไม่มี console errors
- [ ] ไม่มี TypeScript errors

### Testing Commands

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build test
npm run build
```

## Debugging

### Console Logging

```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### React DevTools
ใช้ React DevTools extension เพื่อ:
- ตรวจสอบ component tree
- ดู props และ state
- Profile performance

### Network Tab
ใช้ Browser DevTools Network tab เพื่อ:
- ดู API requests/responses
- ตรวจสอบ status codes
- ดู request/response headers

## Common Tasks

### อัพเดท Dependencies

```bash
# ดู outdated packages
npm outdated

# อัพเดท package
npm update <package-name>

# อัพเดททั้งหมด (ระวัง breaking changes)
npm update
```

### แก้ไข ESLint Warnings

```bash
# แก้ไขอัตโนมัติ
npm run lint -- --fix
```

### Clear Cache

```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Environment Variables

```bash
# Development
.env.local

# Production
.env.production

# ใช้ใน code
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Git Workflow

### Branch Naming

```
feature/feature-name    # ฟีเจอร์ใหม่
fix/bug-description     # แก้ bug
hotfix/critical-fix     # แก้ปัญหาด่วน
refactor/what-changed   # ปรับปรุง code
```

### Commit Messages

```
feat: เพิ่มหน้าจัดการสินค้า
fix: แก้ไขปัญหา login ไม่ได้
refactor: ปรับโครงสร้าง AuthContext
docs: อัพเดทเอกสาร API
style: แก้ไข formatting
```

### Pull Request

1. สร้าง branch ใหม่
2. พัฒนาฟีเจอร์
3. Test ให้แน่ใจว่าทำงาน
4. Commit และ push
5. สร้าง PR พร้อม description ที่ชัดเจน
6. รอ code review

## Performance Tips

### 1. Memoization

```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### 2. Lazy Loading

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 3. Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // for above-the-fold images
/>
```

## Troubleshooting

### ปัญหา: "Module not found"
```bash
npm install
# หรือลบและติดตั้งใหม่
rm -rf node_modules && npm install
```

### ปัญหา: Port 3000 ถูกใช้แล้ว
```bash
# หา process ที่ใช้ port 3000
lsof -i :3000
# หรือใช้ port อื่น
PORT=3001 npm run dev
```

### ปัญหา: TypeScript errors หลัง update
```bash
# Restart TS server ใน VS Code
# Command Palette > TypeScript: Restart TS Server
```

---

**Happy Coding! 🚀**

ถ้ามีคำถามหรือพบปัญหา สามารถเปิด Issue ใน GitHub Repository ได้เลย
