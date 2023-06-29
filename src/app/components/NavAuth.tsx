'use client';
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiHelpCircle, BiLogOut } from 'react-icons/bi';

import OnboardingModal from './OnboardingModal';

export default function NavAuth() {
  const { signOut } = useClerk();
  const router = useRouter();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className='absolute inset-x-0 bottom-3 mx-3 border-t border-neutral-300 py-2 font-open_sans text-black shadow-black/20 sm:block'>
      <SignedIn>
        <div className='flex items-center gap-x-4 2xl:justify-around 2xl:gap-0 '>
          <UserButton afterSignOutUrl='/' showName />
          {/* <BiLogOut
            className='w-6 cursor-pointer inline-block h-6 hover:opacity-50'
            onClick={handleSignOut}
          /> */}
          <BiHelpCircle
            className='inline-block h-6 w-6 cursor-pointer text-blue-500 hover:opacity-50'
            onClick={() => setShowOnboarding(true)}
          />
          {showOnboarding && (
            <OnboardingModal onClose={handleOnboardingClose} />
          )}
        </div>
      </SignedIn>
    </div>
  );
}
