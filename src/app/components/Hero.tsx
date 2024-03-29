import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import logo from '../../../public/smart-day-logo.svg';

export default function Hero() {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className='relative isolate overflow-hidden bg-white'>
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-gray-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
            width={200}
            height={200}
            x='50%'
            y={-1}
            patternUnits='userSpaceOnUse'
          >
            <path d='M.5 200V.5H200' fill='none' />
          </pattern>
        </defs>
        <rect
          width='100%'
          height='100%'
          strokeWidth={0}
          fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
        />
      </svg>
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8'>
          <Image src={logo} alt='logo' width={150} height={100} />

          <h1 className='mt-2 font-roboto text-4xl font-bold !leading-tight tracking-tight text-orange-800 sm:text-6xl'>
            Maximize Productivity, Spend Your Day Smart
          </h1>
          <p className='mt-6 font-open_sans text-lg leading-8 text-gray-600'>
            Smart Day leverages AI technology to analyze your activities,
            provide insights, and optimize your goal attainment process.
          </p>
          <p className='mt-1 font-open_sans text-lg leading-8 text-gray-600'>
            Set daily goals, monitor your progress, and achieve success with
            ease.
          </p>
          <div className='mt-10 flex items-center gap-x-6'>
            <Link
              href='/sign-up'
              className='rounded-md bg-teal-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700'
            >
              Get started
            </Link>
            <Link
              href='/sign-in'
              className='group text-lg font-semibold leading-6 text-teal'
            >
              <span className='group-hover:text-teal-800'>
                Sign in <span aria-hidden='true'>→</span>
              </span>
            </Link>
          </div>
        </div>
        <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32'>
          <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='https://res.cloudinary.com/dbyigmrto/image/upload/v1688271084/Screenshot_2023-07-01_at_11.11.03_PM_ut4sqs.png'
                alt='App screenshot'
                width={2432}
                height={1442}
                className='w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
