import './globals.css';
import "@radix-ui/themes/styles.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import MarqueeBar from './components/MarqueeBar';
import { NavBarDemo } from './components/Navbar';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Tracker',
  description: 'Track cryptocurrency prices and market data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          <MarqueeBar/>
          <NavBarDemo/>
   
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}