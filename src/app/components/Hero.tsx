'use client';
import { auth } from '@clerk/nextjs';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TimeSpentLogo from '../../../public/time-spent-logo.svg';

export default function Hero({ userId }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  if (userId) {
    router.push('/dashboard');
  }
  return (
    <div className='bg-white'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='flex items-center justify-between p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Time Spent</span>

              <Image src={TimeSpentLogo} width={40} height={40} alt='' />
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='text-gray-700 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'></div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <Link
              className='text-gray-900 text-sm font-semibold leading-6'
              href='/sign-in'
            >
              Log in <span aria-hidden='true'>&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog
          as='div'
          className='lg:hidden'
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='sm:ring-gray-900/10 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                  alt=''
                />
              </a>
              <button
                type='button'
                className='text-gray-700 -m-2.5 rounded-md p-2.5'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='divide-gray-500/10 -my-6 divide-y'>
                <div className='space-y-2 py-6'></div>
                <div className='py-6'>
                  <a
                    href='#'
                    className='text-gray-900 hover:bg-gray-50 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7'
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className='relative isolate pt-14'>
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className='py-24 sm:py-32 lg:pb-40'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl text-center'>
              <h1 className='text-gray-900 text-4xl font-bold tracking-tight sm:text-6xl'>
                Track and Achieve Your Goals Effortlessly
              </h1>
              <p className='text-gray-600 mt-6 text-lg leading-8'>
                Stay focused and organized with our goal tracking app. Set daily
                goals, monitor your progress, and achieve success with ease. Our
                app leverages AI technology to analyze your activities, provide
                insights, and optimize your goal attainment process. With
                AI-powered analytics, you can make data-driven decisions,
                identify patterns, and unlock your full potential.
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <Link
                  className='rounded-md bg-indigo px-5 py-4 text-lg font-semibold text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo'
                  href='/sign-up'
                >
                  Get started
                </Link>
              </div>
            </div>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='bg-gray-900/5 ring-gray-900/10 -m-2 rounded-xl p-2 ring-1 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4'>
                <img
                  src='https://res.cloudinary.com/dbyigmrto/image/upload/v1687931205/time-spent_l8h5vb.png'
                  alt='App screenshot'
                  width={2432}
                  height={1442}
                  className='ring-gray-900/10 rounded-md shadow-2xl ring-1'
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
