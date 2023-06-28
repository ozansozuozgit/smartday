'use client';
import { useAppSelector } from '@/src/redux/hooks';
import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineBars, AiOutlineCloseCircle } from 'react-icons/ai';
import Clock from './Clock';
import DatePicker from './DatePicker';
import Goals from './Goals';

import dynamic from 'next/dynamic';

const NavAuth = dynamic(() => import('./NavAuth'), { ssr: false });
export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const goals = useAppSelector((state) => state.user.goals);

  return (
    <div className='2xl:z-2 border-gray fixed top-0 z-10 flex w-full flex-col border-b bg-white shadow-lg 2xl:bottom-0 2xl:w-56 '>
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
          <AiOutlineCloseCircle className='block h-6 w-6 text-orange' />
        ) : (
          <AiOutlineBars className='block h-6 w-6 text-orange' />
        )}
      </button>

      <div
        className={clsx(
          'l:h-full w-3/4 overflow-y-auto bg-white 2xl:static 2xl:block 2xl:w-auto',
          {
            'fixed inset-x-0 bottom-0 top-14 mt-px': isOpen,
            hidden: !isOpen,
          }
        )}
      >
        <nav className='h-full space-y-6 px-2 py-5'>
          <Goals goals={goals} />
          <NavAuth />
        </nav>
      </div>
    </div>
  );
}
