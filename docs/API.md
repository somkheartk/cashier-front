# 🔌 API Documentation - เอกสาร API

เอกสารนี้อธิบายการเชื่อมต่อระหว่าง Frontend และ Backend API

## 📋 สารบัญ

- [ภาพรวม](#ภาพรวม)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Request/Response Examples](#requestresponse-examples)

## ภาพรวม

Cashier Front เป็น Client-side application ที่เชื่อมต่อกับ Backend API ผ่าน HTTP/HTTPS

### Technology
- **Protocol**: HTTP/HTTPS
- **Format**: JSON
- **Authentication**: Bearer Token (JWT)

### Communication Flow

```
┌──────────────┐         HTTP Request          ┌──────────────┐
│   Frontend   │ ───────────────────────────> │   Backend    │
│  (Next.js)   │                               │     API      │
│              │ <─────────────────────────── │              │
└──────────────┘         HTTP Response         └──────────────┘
```

## Base URL

### Development
```
http://localhost:7800
```

### Production
```
https://api.yourdomain.com
```

### การตั้งค่า

ตั้งค่าใน `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:7800
```

การใช้งานใน code:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7800';
```

## Authentication

### Login Flow

```typescript
// 1. User login
POST /auth/login
Body: {
  "username": "admin",
  "password": "password"
}

// 2. Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Admin User",
    "roles": ["admin", "manager"]
  }
}

// 3. Store token
localStorage.setItem('token', access_token);
localStorage.setItem('user', JSON.stringify(user));

// 4. Use token in subsequent requests
Authorization: Bearer {access_token}
```

### การใช้งาน Authentication

```typescript
const token = localStorage.getItem('token');

const response = await fetch(`${API_URL}/endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});
```

## API Endpoints

### Authentication

#### POST /auth/login
เข้าสู่ระบบ

**Request:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response (Success - 200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Admin User",
    "roles": ["admin", "manager"]
  }
}
```

**Response (Error - 401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

---

### Orders

#### GET /orders
ดึงรายการออเดอร์ทั้งหมด

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional): `pending`, `preparing`, `ready`, `completed`, `cancelled`
- `page` (optional): หมายเลขหน้า (default: 1)
- `limit` (optional): จำนวนต่อหน้า (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": 1001,
      "customerName": "คุณสมชาย",
      "customerPhone": "081-234-5678",
      "tableNumber": "A1",
      "status": "preparing",
      "total": 180,
      "items": [
        {
          "id": 1,
          "name": "กาแฟเย็น",
          "price": 30,
          "quantity": 2
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

#### GET /orders/:id
ดึงรายละเอียดออเดอร์

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": 1001,
  "customerName": "คุณสมชาย",
  "customerPhone": "081-234-5678",
  "tableNumber": "A1",
  "status": "preparing",
  "total": 180,
  "items": [
    {
      "id": 1,
      "productId": 101,
      "name": "กาแฟเย็น",
      "price": 30,
      "quantity": 2,
      "subtotal": 60
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

#### POST /orders
สร้างออเดอร์ใหม่

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "customerName": "คุณสมชาย",
  "customerPhone": "081-234-5678",
  "tableNumber": "A1",
  "items": [
    {
      "productId": 101,
      "quantity": 2
    },
    {
      "productId": 102,
      "quantity": 1
    }
  ]
}
```

**Response (201):**
```json
{
  "id": 1002,
  "customerName": "คุณสมชาย",
  "customerPhone": "081-234-5678",
  "tableNumber": "A1",
  "status": "pending",
  "total": 180,
  "items": [
    {
      "id": 1,
      "productId": 101,
      "name": "กาแฟเย็น",
      "price": 30,
      "quantity": 2,
      "subtotal": 60
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### PATCH /orders/:id/status
อัพเดทสถานะออเดอร์

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "status": "preparing"
}
```

**Response:**
```json
{
  "id": 1001,
  "status": "preparing",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

#### DELETE /orders/:id
ยกเลิกออเดอร์

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Order cancelled successfully"
}
```

---

### Customers

#### GET /customers
ดึงรายชื่อลูกค้า

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): หมายเลขหน้า
- `limit` (optional): จำนวนต่อหน้า
- `search` (optional): ค้นหาจากชื่อหรือเบอร์โทร

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "สมชาย ใจดี",
      "email": "somchai@email.com",
      "phone": "081-234-5678",
      "membershipLevel": "gold",
      "totalOrders": 45,
      "totalSpent": 125000,
      "lastOrderDate": "2024-01-15",
      "createdAt": "2023-06-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### GET /customers/:id
ดึงข้อมูลลูกค้า

**Response:**
```json
{
  "id": 1,
  "name": "สมชาย ใจดี",
  "email": "somchai@email.com",
  "phone": "081-234-5678",
  "membershipLevel": "gold",
  "totalOrders": 45,
  "totalSpent": 125000,
  "lastOrderDate": "2024-01-15",
  "orders": [
    {
      "id": 1001,
      "total": 180,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "createdAt": "2023-06-01T00:00:00Z"
}
```

#### POST /customers
เพิ่มลูกค้าใหม่

**Request:**
```json
{
  "name": "สมชาย ใจดี",
  "email": "somchai@email.com",
  "phone": "081-234-5678",
  "membershipLevel": "bronze"
}
```

**Response (201):**
```json
{
  "id": 2,
  "name": "สมชาย ใจดี",
  "email": "somchai@email.com",
  "phone": "081-234-5678",
  "membershipLevel": "bronze",
  "totalOrders": 0,
  "totalSpent": 0,
  "createdAt": "2024-01-15T10:40:00Z"
}
```

#### PUT /customers/:id
แก้ไขข้อมูลลูกค้า

**Request:**
```json
{
  "name": "สมชาย ใจดี",
  "email": "somchai@email.com",
  "phone": "081-234-5678",
  "membershipLevel": "silver"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "สมชาย ใจดี",
  "email": "somchai@email.com",
  "phone": "081-234-5678",
  "membershipLevel": "silver",
  "updatedAt": "2024-01-15T10:45:00Z"
}
```

#### DELETE /customers/:id
ลบลูกค้า

**Response:**
```json
{
  "message": "Customer deleted successfully"
}
```

---

### Products

#### GET /products
ดึงรายการสินค้า

**Response:**
```json
{
  "data": [
    {
      "id": 101,
      "name": "กาแฟเย็น",
      "price": 30,
      "category": "beverages",
      "stock": 100,
      "image": "/images/products/101.jpg"
    }
  ]
}
```

#### POST /products
เพิ่มสินค้าใหม่

**Request:**
```json
{
  "name": "กาแฟเย็น",
  "price": 30,
  "category": "beverages",
  "stock": 100
}
```

---

### Reports

#### GET /reports/sales
รายงานยอดขาย

**Query Parameters:**
- `startDate`: วันที่เริ่มต้น (YYYY-MM-DD)
- `endDate`: วันที่สิ้นสุด (YYYY-MM-DD)

**Response:**
```json
{
  "summary": {
    "totalSales": 125000,
    "totalOrders": 450,
    "averageOrderValue": 278
  },
  "daily": [
    {
      "date": "2024-01-15",
      "sales": 12500,
      "orders": 45,
      "customers": 32
    }
  ]
}
```

#### GET /reports/products
รายงานสินค้า

**Response:**
```json
{
  "topProducts": [
    {
      "productId": 101,
      "name": "กาแฟเย็น",
      "sales": 450,
      "revenue": 13500
    }
  ]
}
```

#### GET /reports/customers
รายงานลูกค้า

**Response:**
```json
{
  "topCustomers": [
    {
      "customerId": 1,
      "name": "สมชาย ใจดี",
      "orders": 45,
      "spent": 125000
    }
  ]
}
```

## Error Handling

### HTTP Status Codes

- `200 OK` - สำเร็จ
- `201 Created` - สร้างสำเร็จ
- `400 Bad Request` - ข้อมูลไม่ถูกต้อง
- `401 Unauthorized` - ไม่ได้ล็อกอิน
- `403 Forbidden` - ไม่มีสิทธิ์
- `404 Not Found` - ไม่พบข้อมูล
- `500 Internal Server Error` - เกิดข้อผิดพลาดที่เซิร์ฟเวอร์

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### การจัดการ Error ใน Frontend

```typescript
async function apiCall() {
  try {
    const response = await fetch(`${API_URL}/endpoint`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Show error to user
    alert(error.message);
  }
}
```

## Request/Response Examples

### สร้างออเดอร์แบบสมบูรณ์

```typescript
// Frontend code
const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      tableNumber: orderData.tableNumber,
      items: orderData.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

// Usage
try {
  const order = await createOrder({
    customerName: 'คุณสมชาย',
    customerPhone: '081-234-5678',
    tableNumber: 'A1',
    items: [
      { productId: 101, quantity: 2 },
      { productId: 102, quantity: 1 },
    ],
  });
  
  console.log('Order created:', order);
} catch (error) {
  console.error('Failed to create order:', error);
}
```

### อัพเดทสถานะออเดอร์

```typescript
const updateOrderStatus = async (orderId, newStatus) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error('Failed to update order status');
  }

  return response.json();
};

// Usage
await updateOrderStatus(1001, 'preparing');
```

## Best Practices

### 1. Error Handling
ตรวจสอบ response status และจัดการ error อย่างเหมาะสม

### 2. Loading States
แสดง loading indicator ระหว่างรอ API response

### 3. Token Refresh
ตรวจสอบ token expiration และ refresh เมื่อจำเป็น

### 4. Retry Logic
ใช้ retry สำหรับ request ที่ล้มเหลว (network errors)

### 5. Caching
Cache ข้อมูลที่ไม่เปลี่ยนแปลงบ่อย (เช่น product list)

---

**หมายเหตุ:** API endpoints ข้างต้นเป็นตัวอย่าง ควรตรวจสอบกับเอกสาร Backend API จริงสำหรับ endpoints และ parameters ที่แน่นอน
