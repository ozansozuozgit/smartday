'use client';

import { demos, type Item } from '@/lib/demos';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import Goals from './Goals';
import NavAuth from './NavAuth';
import Clock from './Clock';
export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className='fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-white lg:bottom-0 lg:z-auto lg:w-72 shadow-lg '>
      <div className='flex h-14 items-center py-4 px-4 lg:h-auto'>
        <Link
          href='/'
          className='group flex w-full items-center gap-x-2.5'
          onClick={close}
        >
          <div className='h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50'></div>
          {/* Clock display */}
          <Clock />
          <h3 className='font-semibold tracking-wide text-gray-400 group-hover:text-gray-50'>
            App Router
          </h3>
        </Link>
      </div>
      <button
        type='button'
        className='group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='font-medium text-gray-100 group-hover:text-gray-400'>
          Menu
        </div>
        {isOpen ? (
          <XMarkIcon className='block w-6 text-gray-400' />
        ) : (
          <Bars3BottomLeftIcon className='block w-6 text-gray-400' />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className='space-y-6 px-2 py-5'>
          <Goals />
          <NavAuth />
        </nav>
      </div>
    </div>
  );
}
