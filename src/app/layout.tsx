import { Kanit, Sarabun, Prompt } from 'next/font/google';
import ThemeWrapper from '../components/ThemeWrapper';
import { AuthProvider } from '../contexts/AuthContext';
import AppWrapper from '../components/AppWrapper';
import '../styles/globals.css';

const kanit = Kanit({ 
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit'
});

const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sarabun'
});

const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-prompt'
});

export const metadata = {
  title: 'POS Admin System',
  description: 'Point of Sale Administration System',
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${sarabun.variable} ${prompt.variable} ${kanit.className}`}>
        <ThemeWrapper>
          <AuthProvider>
            <AppWrapper>
              {children}
            </AppWrapper>
          </AuthProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
