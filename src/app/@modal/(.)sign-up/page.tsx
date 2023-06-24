'use client';
import { SignUp } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Modal from '../../components/modal';

export default function InterceptedSignUpPage() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/dashboard') {
      location.reload();
    }
  }, [pathname]);

  return (
    <Modal>
      <SignUp
        afterSignUpUrl='/dashboard'
        signInUrl='/sign-in'
        redirectUrl='/dashboard'
      />
    </Modal>
  );
}
