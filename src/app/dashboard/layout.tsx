import React from 'react';
import { SidebarNav } from '../components/SidebarNav';
export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarNav />
      <div className='2xl:pl-56'>{children}</div>
    </div>
  );
}
