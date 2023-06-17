import React from 'react';
import { SidebarNav } from '../components/SidebarNav';
export const metadata = {
  title: 'Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarNav />
      <div className='lg:pl-72'>{children}</div>
    </div>
  );
}
