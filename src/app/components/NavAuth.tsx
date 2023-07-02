'use client';
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiHelpCircle, BiLogOut } from 'react-icons/bi';
import ContactModal from './ContactModal';
import OnboardingModal from './OnboardingModal';
export default function NavAuth() {
  const { signOut } = useClerk();
  const router = useRouter();
  const [showContactModal, setShowContactModal] = useState(false);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };
  const handleContactModalClose = () => {
    setShowContactModal(false);
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

          <div className='flex gap-x-2'>
            <AiOutlineMail
              className='inline-block h-5 w-5 cursor-pointer text-teal-500 hover:opacity-50'
              onClick={() => setShowContactModal(true)}
            />
            <BiHelpCircle
              className='inline-block h-5 w-5 cursor-pointer text-blue-500 hover:opacity-50'
              onClick={() => setShowOnboarding(true)}
            />
            <BiLogOut
              className='inline-block h-5 w-5 cursor-pointer text-red-500 hover:opacity-50'
              onClick={handleSignOut}
            />
          </div>

          {showOnboarding && (
            <OnboardingModal onClose={handleOnboardingClose} />
          )}
          {showContactModal && (
            <ContactModal onClose={handleContactModalClose} />
          )}
        </div>
      </SignedIn>
    </div>
  );
}
