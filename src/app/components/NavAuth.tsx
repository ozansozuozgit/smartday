'use client';

// import { VercelLogo } from '#/ui/vercel-logo';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import SignOutButton from './SignOutButton';

export default function NavAuth() {
  // const { data: session, status } = useSession();
  // console.log(session, status);

  // if (status === 'loading') {
  //   return <>...</>;
  // }

  return (
    <div
      className={`absolute sm:block inset-x-0 bottom-3 mx-3 bg-vc-border-gradient  shadow-black/20 border-t border-black py-2 text-black `}
    >
      {status === 'authenticated' && (
        <div className='flex justify-around items-center	'>
          {/* <Image
            src={session?.user?.image ?? 'https://via.placeholder.com/32'}
            width={32}
            height={32}
            alt='Your Name'
            className='rounded-full'
          /> */}
          {/* <span>{session?.user?.name ?? 'Unknown'}</span> */}
          {/* <SignedIn> */}
          {/* Signed in users will see their user profile */}
          {/* <UserButton /> */}
          {/* </SignedIn>{' '} */}
        </div>
      )}
      <SignedIn />
      <UserButton afterSignOutUrl='/' showName />
      <SignedIn />
    </div>
  );
}
