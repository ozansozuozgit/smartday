'use client';
import { useAppSelector } from '@/src/redux/hooks';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineBars, AiOutlineCloseCircle } from 'react-icons/ai';
import logo from '../../../public/smart-day-logo.svg';
import DatePicker from './DatePicker';
import Goals from './Goals';

const NavAuth = dynamic(() => import('./NavAuth'), { ssr: false });
export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const goals = useAppSelector((state) => state.user.goals);
  const ref = useRef(null); // Change here

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        if (
          event.target.classList.contains(
            'cl-userButtonPopoverActionButtonText'
          )
        ) {
          return; // Don't close if clicked on 'Manage account'
        }
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className='2xl:z-2 border-gray fixed top-0 z-10 flex w-full flex-col border-b bg-white shadow-lg 2xl:bottom-0 2xl:w-56 '
      ref={ref}
    >
      <div className='flex h-14 max-w-[200px] flex-row items-center border-b border-neutral-300 px-3 py-2 lg:h-auto lg:max-w-sm lg:flex-col 2xl:gap-y-1'>
        <Image src={logo} alt='logo' width={150} height={100} />
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
          'z-50 flex w-fit max-w-[250px] overflow-visible overflow-y-auto bg-white shadow-modern lg:h-full 2xl:static 2xl:block 2xl:w-auto 2xl:shadow-none',
          {
            'fixed inset-x-0 bottom-0 top-[54px] mt-px': isOpen,
            hidden: !isOpen,
          }
        )}
      >
        <nav className='h-full space-y-3 px-2 py-5'>
          <DatePicker />

          <Goals goals={goals} />
          <NavAuth />
        </nav>
      </div>
    </div>
  );
}
