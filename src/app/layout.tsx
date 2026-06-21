import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { iranSans } from './iransans';
import 'react-data-grid/lib/styles.css';
import ReactQueryProvider from './react-query-provider';

import ToastWrapper from './toast-wrapper';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      {/* <body className={`${iranSans.className} dark:bg-gray-900`}> */}
      <body
        className={`${iranSans.className} antialiased  dark:bg-gray-900`}
        dir="rtl"
      >
        <ReactQueryProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <ToastWrapper />
      </body>
    </html>
  );
}
