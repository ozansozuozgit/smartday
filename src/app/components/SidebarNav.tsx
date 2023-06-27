'use client';

import { demos, type Item } from '@/lib/demos';
import { useAppSelector } from '@/src/redux/hooks';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineBars, AiOutlineCloseCircle } from 'react-icons/ai';
import Clock from './Clock';
import DatePicker from './DatePicker';
import Goals from './Goals';

// import NavAuth from './NavAuth';
import dynamic from 'next/dynamic';

const NavAuth = dynamic(() => import('./NavAuth'), { ssr: false });
export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const goals = useAppSelector((state) => state.user.goals);

  return (
    <div className='border-gray 2xl:z-2 fixed top-0 z-10 flex w-full flex-col border-b bg-white shadow-lg 2xl:bottom-0 2xl:w-56 '>
      <div className='flex h-14 max-w-sm flex-row items-center border-b border-neutral-300 px-3 py-4 lg:h-auto lg:flex-col 2xl:gap-y-5'>
        <Clock />
        <DatePicker />
      </div>
      <button
        type='button'
        className='group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 2xl:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <AiOutlineCloseCircle className='text-orange block h-6 w-6' />
        ) : (
          <AiOutlineBars className='text-orange block h-6 w-6' />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto bg-white 2xl:static 2xl:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className='space-y-6 px-2 py-5'>
          <Goals goals={goals} />
          <NavAuth />
        </nav>
      </div>
    </div>
  );
}
