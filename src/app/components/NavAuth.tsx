'use client';
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs';
import { useRouter } from "next/navigation";

import { GoSignOut } from 'react-icons/go';
export default function NavAuth() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };
  return (
    <div
      className={`absolute inset-x-0 bottom-3 mx-3 border-t  border-neutral-300 py-2 font-open_sans text-black shadow-black/20 sm:block`}
    >
      <SignedIn />
      <div className='flex items-center justify-between'>
        <UserButton afterSignOutUrl='/' showName />
        <GoSignOut
          className='inline-block h-6 w-6 cursor-pointer hover:opacity-50'
          onClick={handleSignOut}
        />
      </div>
      <SignedIn />
    </div>
  );
}
