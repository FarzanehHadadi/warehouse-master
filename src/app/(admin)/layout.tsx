'use client';

import { useSidebar } from '@/context/SidebarContext';
import AppHeader from '@/layout/AppHeader';
import AppSidebar from '@/layout/AppSidebar';
import Backdrop from '@/layout/Backdrop';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? 'mr-0'
    : isExpanded || isHovered
    ? 'lg:mr-[290px]'
    : 'lg:mr-[90px]';
  const mainContentWidth = isMobileOpen
    ? 'mr-0'
    : isExpanded || isHovered
    ? 'lg:max-w-[calc(100vw-290px)]'
    : 'lg:max-w-[calc(100vw-90px)]';

  return (
    <div className="min-h-screen xl:flex xl:flex-row-reverse">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`w-full flex-1 flex flex-col transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div
          className={`p-4 mx-auto w-full   md:p-2 flex-1 ${mainContentWidth}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
