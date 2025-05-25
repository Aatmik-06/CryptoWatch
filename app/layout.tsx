import './globals.css';
import "@radix-ui/themes/styles.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
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
          
         
          <NavBarDemo/>
   
          {children}
        </ThemeProvider>
         {/* Footer */}
      <footer className="bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-20">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                CryptoWatch
              </h3>
              <p className="text-muted-foreground">
                Your trusted source for cryptocurrency market data and insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </a>
                </li>
              
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Market Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CryptoWatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </body>
    </html>
  );
}