import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarNav from '../components/SidebarNav';
export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
  keywords: ['dashboard', 'time tracking', 'productivity', 'time management'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarNav />
      <div className='bg-slate-100 2xl:pl-56'>{children}</div>
      <ToastContainer />
    </div>
  );
}
