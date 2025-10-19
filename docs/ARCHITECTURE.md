# 🏗️ Architecture Guide - คู่มือสถาปัตยกรรม

เอกสารนี้อธิบายสถาปัตยกรรมและการออกแบบของระบบ Cashier Front

## 📋 สารบัญ

- [ภาพรวมสถาปัตยกรรม](#ภาพรวมสถาปัตยกรรม)
- [Technology Stack](#technology-stack)
- [โครงสร้างโฟลเดอร์](#โครงสร้างโฟลเดอร์)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Routing](#routing)
- [Authentication Flow](#authentication-flow)
- [Component Architecture](#component-architecture)

## ภาพรวมสถาปัตยกรรม

Cashier Front เป็น Single Page Application (SPA) ที่พัฒนาด้วย Next.js 15 โดยใช้ App Router และ Client-Side Rendering สำหรับส่วนใหญ่ของแอปพลิเคชัน

```
┌─────────────────────────────────────────────────┐
│                  Browser                         │
│  ┌───────────────────────────────────────────┐  │
│  │         Next.js App Router                │  │
│  │  ┌────────────────────────────────────┐   │  │
│  │  │  React Components (Client-Side)    │   │  │
│  │  │  - Pages (Dashboard, Orders, etc)  │   │  │
│  │  │  - Shared Components               │   │  │
│  │  └────────────────────────────────────┘   │  │
│  │  ┌────────────────────────────────────┐   │  │
│  │  │  Context API (State Management)    │   │  │
│  │  │  - AuthContext                     │   │  │
│  │  └────────────────────────────────────┘   │  │
│  │  ┌────────────────────────────────────┐   │  │
│  │  │  Material-UI Components & Theme    │   │  │
│  │  └────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────┐
│              Backend API Server                  │
│         (http://localhost:7800)                  │
│  - Authentication (/auth/login)                  │
│  - Orders API                                    │
│  - Customers API                                 │
│  - Reports API                                   │
└─────────────────────────────────────────────────┘
```

## Technology Stack

### Core Framework
- **Next.js 15.5.4**
  - App Router สำหรับ routing
  - Turbopack สำหรับ fast builds
  - Middleware สำหรับ authentication checks

### UI Layer
- **React 19.1.0**
  - Functional Components
  - Hooks (useState, useEffect, useContext, etc.)
  - Client Components (`"use client"`)

- **Material-UI 7.3.2**
  - Pre-built components
  - Theming system
  - Responsive design utilities

- **Emotion**
  - CSS-in-JS styling
  - Dynamic styling based on props

### Data Visualization
- **Recharts 3.2.1**
  - Chart components (Line, Bar, Pie, Area)
  - Responsive containers
  - Tooltips and legends

### Utilities
- **TypeScript 5.x** - Type safety
- **date-fns 4.1.0** - Date manipulation and formatting
- **Tailwind CSS 4** - Utility classes

## โครงสร้างโฟลเดอร์

```
src/
├── app/                    # Next.js App Router
│   ├── customers/         # Customer management page
│   │   └── page.tsx      # /customers route
│   ├── login/            # Login page
│   │   └── page.tsx      # /login route
│   ├── orders/           # Order management page
│   │   └── page.tsx      # /orders route
│   ├── reports/          # Reports page
│   │   └── page.tsx      # /reports route
│   ├── favicon.ico       # Site favicon
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout (wraps all pages)
│   └── page.tsx          # Dashboard (/ route)
│
├── components/           # Reusable components
│   ├── AdminLayout.tsx   # Main admin layout with sidebar
│   ├── AppWrapper.tsx    # App-level wrapper
│   ├── RoleBadge.tsx     # Role display badge
│   └── ThemeWrapper.tsx  # MUI theme provider
│
├── contexts/            # React Context providers
│   └── AuthContext.tsx  # Authentication context
│
├── styles/              # Style files
│   └── (global styles)
│
└── middleware.ts        # Next.js middleware (auth check)
```

### การจัดโครงสร้างตาม Feature

แต่ละหน้าจัดการ feature ของตัวเองแยกกัน:
- **Dashboard** (`app/page.tsx`) - KPIs, summary, quick actions
- **Orders** (`app/orders/page.tsx`) - Order CRUD operations
- **Customers** (`app/customers/page.tsx`) - Customer management
- **Reports** (`app/reports/page.tsx`) - Analytics and reports

## Data Flow

### 1. Authentication Flow

```
User Input (Login Form)
    ↓
AuthContext.login()
    ↓
POST /auth/login (Backend API)
    ↓
Success: Store token & user in localStorage
    ↓
Update AuthContext state
    ↓
Redirect to Dashboard
```

### 2. Data Fetching Flow (ตัวอย่าง)

```
Component Mount
    ↓
useEffect()
    ↓
fetch() / API call
    ↓
Update local state (useState)
    ↓
Re-render with new data
```

### 3. User Interaction Flow

```
User Action (Button click)
    ↓
Event Handler
    ↓
State Update (useState)
    ↓
API Call (if needed)
    ↓
Update UI
```

## State Management

### Local State (useState)
ใช้สำหรับ state ที่ใช้เฉพาะใน component นั้นๆ:
- Form data
- Dialog open/close state
- Loading states
- Local filters

```typescript
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(false);
const [dialogOpen, setDialogOpen] = useState(false);
```

### Global State (Context API)

#### AuthContext
จัดการ authentication state ทั้งหมด:

```typescript
interface AuthContextType {
  user: User | null;           // ข้อมูลผู้ใช้ปัจจุบัน
  isLoading: boolean;          // สถานะการโหลด
  login: (username, password) => Promise<boolean>;
  logout: () => void;
  hasRole: (role) => boolean;
  hasAnyRole: (roles) => boolean;
  switchRole: (role) => void;
}
```

**การใช้งาน:**

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, logout, hasRole } = useAuth();
  
  if (!hasRole('admin')) {
    return <div>No access</div>;
  }
  
  return <div>Welcome {user?.name}</div>;
}
```

## Routing

### App Router Structure

Next.js App Router ใช้ file-system based routing:

```
app/
├── page.tsx              → /
├── login/
│   └── page.tsx         → /login
├── orders/
│   └── page.tsx         → /orders
├── customers/
│   └── page.tsx         → /customers
└── reports/
    └── page.tsx         → /reports
```

### Navigation

```typescript
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();
  
  // Navigate to a page
  router.push('/orders');
  
  // Go back
  router.back();
}
```

### Middleware Protection

ไฟล์ `middleware.ts` ตรวจสอบ authentication:

```typescript
export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
```

## Authentication Flow

### 1. Login Process

```
┌─────────┐     ┌──────────────┐     ┌────────────┐
│  User   │────>│ Login Form   │────>│ AuthContext│
└─────────┘     └──────────────┘     └────────────┘
                                           │
                                           ↓
                                    ┌──────────────┐
                                    │ Backend API  │
                                    └──────────────┘
                                           │
                                           ↓
                        ┌──────────────────┴──────────────────┐
                        │                                     │
                    Success                               Failure
                        │                                     │
                        ↓                                     ↓
            ┌────────────────────────┐         ┌──────────────────────┐
            │ Store in localStorage  │         │ Show error message   │
            │ - token                │         └──────────────────────┘
            │ - user data            │
            │ - cookie               │
            └────────────────────────┘
                        │
                        ↓
            ┌────────────────────────┐
            │ Update Context state   │
            └────────────────────────┘
                        │
                        ↓
            ┌────────────────────────┐
            │ Redirect to Dashboard  │
            └────────────────────────┘
```

### 2. Protected Routes

```typescript
// middleware.ts checks authentication
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

### 3. Session Persistence

- Token และ user data เก็บใน `localStorage`
- Cookie `isLoggedIn` สำหรับ middleware check
- ตรวจสอบ session ตอน app load (`useEffect` ใน AuthContext)

## Component Architecture

### Layout Hierarchy

```
<html>
  <body>
    <AuthProvider>           {/* contexts/AuthContext */}
      <ThemeWrapper>         {/* components/ThemeWrapper */}
        <AppWrapper>         {/* components/AppWrapper */}
          {isAuthenticated && <AdminLayout />}  {/* Sidebar & Header */}
          <Page />           {/* app/*/page.tsx */}
        </AppWrapper>
      </ThemeWrapper>
    </AuthProvider>
  </body>
</html>
```

### Component Types

#### 1. Page Components
หน้าหลักของแอปพลิเคชัน (ใน `app/`)
- ทำงานเป็น Client Components (`"use client"`)
- จัดการ data fetching และ state
- ประกอบด้วย UI components

#### 2. Layout Components
- `AdminLayout.tsx` - sidebar navigation, header
- `layout.tsx` - root layout

#### 3. Shared Components
- `RoleBadge.tsx` - แสดง badge ของ role
- Components อื่นๆ ที่ใช้ร่วมกัน

#### 4. Context Providers
- `AuthProvider` - authentication state
- `ThemeWrapper` - MUI theme

### Component Communication

#### Parent to Child (Props)
```typescript
<RoleBadge role={user.currentRole} />
```

#### Child to Parent (Callbacks)
```typescript
<Dialog onClose={handleClose} />
```

#### Global State (Context)
```typescript
const { user } = useAuth();
```

## Design Patterns

### 1. Composition Pattern
แยก component เล็กๆ มาประกอบกัน:

```typescript
<Card>
  <CardContent>
    <Typography>Title</Typography>
    <Divider />
    <List>
      {items.map(item => <ListItem key={item.id} />)}
    </List>
  </CardContent>
</Card>
```

### 2. Container/Presentational Pattern
- Container: จัดการ logic และ state
- Presentational: แสดงผล UI เท่านั้น

### 3. Custom Hooks Pattern
สร้าง hook สำหรับ logic ที่ใช้ซ้ำ:

```typescript
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Performance Considerations

### 1. Code Splitting
- Next.js แยก code แต่ละ route อัตโนมัติ
- Dynamic imports สำหรับ heavy components

### 2. Memoization
ใช้ `useMemo` และ `useCallback` เมื่อจำเป็น:

```typescript
const filteredOrders = useMemo(() => 
  orders.filter(o => o.status === filterStatus),
  [orders, filterStatus]
);
```

### 3. Lazy Loading
- Images: ใช้ `next/image` component
- Components: Dynamic import

## Security Considerations

### 1. Authentication
- Token-based authentication
- HTTP-only cookies (ควรใช้ใน production)
- Middleware protection

### 2. Input Validation
- Client-side validation ใน forms
- Server-side validation ใน Backend API

### 3. XSS Prevention
- React แปลง output อัตโนมัติ
- ระวังการใช้ `dangerouslySetInnerHTML`

### 4. CSRF Protection
- Token-based API calls
- SameSite cookies

## API Integration

### Request Format
```typescript
const response = await fetch(`${apiUrl}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
});
```

### Response Handling
```typescript
if (response.ok) {
  const data = await response.json();
  // Handle success
} else {
  // Handle error
}
```

### Error Handling
```typescript
try {
  const result = await apiCall();
} catch (error) {
  console.error('Error:', error);
  setError('เกิดข้อผิดพลาด');
}
```

## Future Improvements

### Recommended Enhancements
1. **Server Components** - ใช้ React Server Components สำหรับ static content
2. **API Layer** - สร้าง abstraction layer สำหรับ API calls
3. **Error Boundary** - จัดการ errors ระดับ component
4. **Loading States** - Skeleton screens แทน loading spinners
5. **Caching** - ใช้ SWR หรือ React Query สำหรับ data caching
6. **Testing** - เพิ่ม unit tests และ integration tests
7. **PWA** - ทำให้เป็น Progressive Web App
8. **Internationalization** - รองรับหลายภาษา (i18n)

---

**หมายเหตุ:** สถาปัตยกรรมนี้ออกแบบให้ยืดหยุ่นและขยายได้ง่าย สามารถปรับเปลี่ยนตามความต้องการของโปรเจคได้
