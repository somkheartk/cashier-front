import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบแล้วหรือไม่
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  // หน้าที่ไม่ต้องล็อกอิน
  const publicPaths = ['/login'];

  // ตรวจสอบว่าเป็นหน้าสาธารณะหรือไม่
  const isPublicPath = publicPaths.includes(pathname);

  // ถ้าเข้าหน้า login แล้วล็อกอินแล้ว ให้ redirect ไปหน้าหลัก
  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ถ้าไม่ใช่หน้าสาธารณะ และยังไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
  // ใน development mode ให้ bypass authentication
  if (!isPublicPath && !isLoggedIn && process.env.NODE_ENV !== 'development') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};