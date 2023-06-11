'use client';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button
      className='rounded p-2 hover:bg-slate-500 hover:text-white'
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
