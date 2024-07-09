// layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import AuthProvider from '@/lib/store/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next App',
  description: 'Next.js starter app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <div className='container'>
              {children}
            </div>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
