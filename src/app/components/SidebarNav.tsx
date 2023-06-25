'use client';

import { demos, type Item } from '@/lib/demos';
import { useAppSelector } from '@/src/redux/hooks';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import Clock from './Clock';
import DatePicker from './DatePicker';
import Goals from './Goals';
import NavAuth from './NavAuth';

export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const goals = useAppSelector((state) => state.user.goals);

  return (
    <div className='fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-white 2xl:bottom-0 2xl:z-auto 2xl:w-72 shadow-lg '>
      <div className='flex flex-row lg:flex-col h-14 items-center py-4 px-4 lg:h-auto 2xl:gap-y-5 max-w-sm border-b border-gray'>
        <Clock />
        <DatePicker />
      </div>
      <button
        type='button'
        className='group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 2xl:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className='block w-6 text-gray-400' />
        ) : (
          <Bars3BottomLeftIcon className='block w-6 text-gray-400' />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto 2xl:static 2xl:block bg-white', {
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
