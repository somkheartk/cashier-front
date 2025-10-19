# 🏪 Cashier Front - ระบบหน้าร้าน POS Admin

ระบบบริหารจัดการร้านค้าแบบครบวงจร (Point of Sale Administration System) ที่พัฒนาด้วย Next.js, TypeScript และ Material-UI

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)

## 📋 สารบัญ

- [คุณสมบัติหลัก](#-คุณสมบัติหลัก)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [ความต้องการของระบบ](#-ความต้องการของระบบ)
- [การติดตั้ง](#-การติดตั้ง)
- [การใช้งาน](#-การใช้งาน)
- [โครงสร้างโปรเจค](#-โครงสร้างโปรเจค)
- [เอกสารเพิ่มเติม](#-เอกสารเพิ่มเติม)
- [การพัฒนา](#-การพัฒนา)
- [การ Deploy](#-การ-deploy)

## ✨ คุณสมบัติหลัก

### 📊 แดชบอร์ด (Dashboard)
- แสดงสรุปยอดขายรายวัน
- แสดงจำนวนออเดอร์และลูกค้าใหม่
- แสดงสินค้าคงเหลือ
- กราฟแสดงแนวโน้มยอดขาย 7 วันย้อนหลัง
- สินค้าขายดีอันดับต้นๆ

### 📦 จัดการออเดอร์ (Orders Management)
- สร้างออเดอร์ใหม่
- ดูรายละเอียดออเดอร์
- อัพเดทสถานะออเดอร์ (รอดำเนินการ, กำลังเตรียม, พร้อมเสิร์ฟ, สำเร็จ)
- กรองออเดอร์ตามสถานะ
- พิมพ์ใบเสร็จ

### 👥 จัดการลูกค้า (Customers Management)
- เพิ่ม/แก้ไข/ลบข้อมูลลูกค้า
- จัดการระดับสมาชิก (Bronze, Silver, Gold)
- แสดงประวัติการสั่งซื้อ
- ติดตามยอดใช้จ่ายรวม

### 📈 รายงาน (Reports)
- รายงานยอดขายรายวัน
- รายงานสินค้าขายดี
- รายงานลูกค้าชั้นนำ
- รายงานรายเดือน
- กราฟและชาร์ตแบบเรียลไทม์
- ส่งออกรายงานเป็น Excel

### 🔐 ระบบ Authentication
- เข้าสู่ระบบด้วย Username/Password
- รองรับ Multiple Roles (Admin, Manager, Staff)
- สลับบทบาทระหว่างการใช้งาน
- ป้องกันการเข้าถึงหน้าที่ไม่มีสิทธิ์

## 🛠 เทคโนโลยีที่ใช้

### Frontend Framework
- **Next.js 15.5.4** - React Framework with Server-Side Rendering
- **React 19.1.0** - UI Library
- **TypeScript 5.x** - Type Safety

### UI Components
- **Material-UI (MUI) 7.3.2** - Component Library
- **Emotion** - CSS-in-JS Styling
- **MUI Icons** - Icon Set
- **MUI X Date Pickers** - Date/Time Components

### Data Visualization
- **Recharts 3.2.1** - Chart Library

### Utilities
- **date-fns 4.1.0** - Date Formatting
- **Tailwind CSS 4** - Utility-First CSS

### Development Tools
- **ESLint** - Code Linting
- **Turbopack** - Fast Build Tool

## 📦 ความต้องการของระบบ

- **Node.js**: เวอร์ชัน 20.x หรือสูงกว่า
- **npm**: เวอร์ชัน 10.x หรือสูงกว่า (หรือ yarn, pnpm, bun)
- **RAM**: อย่างน้อย 4GB
- **พื้นที่ Hard Disk**: อย่างน้อย 500MB สำหรับ dependencies

## 🚀 การติดตั้ง

### 1. Clone Repository

```bash
git clone https://github.com/somkheartk/cashier-front.git
cd cashier-front
```

### 2. ติดตั้ง Dependencies

```bash
npm install
# หรือ
yarn install
# หรือ
pnpm install
# หรือ
bun install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ root:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:7800

# Optional: สำหรับ Production
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 4. เริ่มต้น Development Server

```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
# หรือ
bun dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## 🎯 การใช้งาน

### การเข้าสู่ระบบ

เมื่อเปิดแอปพลิเคชันครั้งแรก คุณจะเห็นหน้า Login:

**ข้อมูลทดสอบ (Demo Credentials):**
- **Username:** `admin`
- **Password:** `password`

> 💡 **หมายเหตุ:** ข้อมูลเข้าสู่ระบบนี้เป็นข้อมูลตัวอย่างเท่านั้น ในการใช้งานจริงควรเชื่อมต่อกับ Backend API

### หน้าจอหลัก

หลังจากเข้าสู่ระบบ คุณจะเห็นเมนูด้านซ้ายมือดังนี้:

1. **🏠 หน้าหลัก** - แดshบอร์ดแสดงภาพรวม
2. **📦 ออเดอร์** - จัดการออเดอร์
3. **👥 ลูกค้า** - จัดการข้อมูลลูกค้า
4. **📈 รายงาน** - ดูรายงานและสถิติ

### การจัดการออเดอร์

1. คลิกที่เมนู "ออเดอร์"
2. กดปุ่ม "สร้างออเดอร์ใหม่" เพื่อสร้างออเดอร์
3. เลือกสินค้า กำหนดจำนวน
4. ระบุข้อมูลลูกค้า (ถ้ามี)
5. บันทึกออเดอร์

### การดูรายงาน

1. คลิกที่เมนู "รายงาน"
2. เลือกประเภทรายงานจาก Tab ด้านบน
3. กำหนดช่วงเวลาที่ต้องการดู
4. คลิก "อัพเดท" เพื่อโหลดข้อมูล
5. สามารถส่งออกเป็น Excel หรือพิมพ์ได้

## 📁 โครงสร้างโปรเจค

```
cashier-front/
├── public/              # Static files
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── customers/  # หน้าจัดการลูกค้า
│   │   ├── login/      # หน้าเข้าสู่ระบบ
│   │   ├── orders/     # หน้าจัดการออเดอร์
│   │   ├── reports/    # หน้ารายงาน
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # หน้าแดชบอร์ด
│   ├── components/     # Reusable components
│   │   ├── AdminLayout.tsx    # Layout หลักของระบบ
│   │   ├── AppWrapper.tsx     # App wrapper
│   │   ├── RoleBadge.tsx      # Badge แสดงบทบาท
│   │   └── ThemeWrapper.tsx   # Theme provider
│   ├── contexts/       # React Contexts
│   │   └── AuthContext.tsx    # Context สำหรับ Authentication
│   ├── styles/         # Global styles
│   └── middleware.ts   # Next.js middleware
├── .eslintrc.json      # ESLint configuration
├── .gitignore         # Git ignore rules
├── eslint.config.mjs  # ESLint config (new format)
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies
├── postcss.config.mjs # PostCSS configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # เอกสารนี้
```

### คำอธิบายโฟลเดอร์สำคัญ

- **`src/app/`** - ใช้ Next.js App Router สำหรับ routing แต่ละโฟลเดอร์คือ 1 route
- **`src/components/`** - Components ที่ใช้ร่วมกันในหลายๆ หน้า
- **`src/contexts/`** - React Context สำหรับจัดการ state ระดับ global
- **`src/middleware.ts`** - ตรวจสอบ authentication ก่อนเข้าหน้าต่างๆ

## 📚 เอกสารเพิ่มเติม

- [📘 คู่มือสถาปัตยกรรม (Architecture Guide)](./docs/ARCHITECTURE.md) - รายละเอียดโครงสร้างและการออกแบบระบบ
- [👨‍💻 คู่มือนักพัฒนา (Development Guide)](./docs/DEVELOPMENT.md) - แนวทางการพัฒนาและ Coding Standards
- [📖 คู่มือผู้ใช้งาน (User Guide)](./docs/USER_GUIDE.md) - วิธีใช้งานระบบแบบละเอียด
- [🔌 เอกสาร API (API Documentation)](./docs/API.md) - รายละเอียด API endpoints และการเชื่อมต่อ Backend

## 👨‍💻 การพัฒนา

### Commands ที่ใช้บ่อย

```bash
# เริ่ม development server
npm run dev

# Build สำหรับ production
npm run build

# เริ่ม production server
npm run start

# ตรวจสอบ code ด้วย ESLint
npm run lint

# แก้ไข linting issues อัตโนมัติ
npm run lint -- --fix
```

### การเพิ่มหน้าใหม่

1. สร้างโฟลเดอร์ใหม่ใน `src/app/` เช่น `products/`
2. สร้างไฟล์ `page.tsx` ในโฟลเดอร์นั้น
3. เพิ่มเมนูใน `src/components/AdminLayout.tsx`

ตัวอย่าง:

```typescript
// src/app/products/page.tsx
"use client";

import { Box, Typography } from '@mui/material';

export default function ProductsPage() {
  return (
    <Box>
      <Typography variant="h4">จัดการสินค้า</Typography>
      {/* เนื้อหาหน้า */}
    </Box>
  );
}
```

### Coding Standards

- ใช้ TypeScript สำหรับ type safety
- ตั้งชื่อไฟล์แบบ PascalCase สำหรับ Components (`ProductCard.tsx`)
- ตั้งชื่อไฟล์แบบ camelCase สำหรับ utilities (`formatDate.ts`)
- ใช้ Functional Components และ Hooks
- เขียนคอมเมนต์เป็นภาษาไทยหรืออังกฤษก็ได้
- ใช้ ESLint เพื่อตรวจสอบ code quality

## 🚀 การ Deploy

### Deploy บน Vercel (แนะนำ)

1. Push โค้ดขึ้น GitHub
2. Import project ใน [Vercel](https://vercel.com)
3. ตั้งค่า Environment Variables
4. Deploy!

### Deploy แบบ Self-Hosted

```bash
# 1. Build project
npm run build

# 2. Start production server
npm run start
```

Server จะรันที่ port 3000 (หรือตามที่กำหนดใน `PORT` environment variable)

### Environment Variables สำหรับ Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

## 🤝 การมีส่วนร่วม

หากต้องการมีส่วนร่วมในการพัฒนา:

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปที่ branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📝 License

Project นี้เป็น private repository สำหรับใช้งานภายในองค์กร

## 📞 ติดต่อและสนับสนุน

หากพบปัญหาหรือมีข้อสงสัย:

- เปิด Issue ใน GitHub Repository
- ติดต่อทีมพัฒนา

---

**สร้างด้วย ❤️ โดยใช้ Next.js, TypeScript และ Material-UI**
