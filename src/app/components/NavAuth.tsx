'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';

export default function NavAuth() {
  return (
    <div
      className={`absolute inset-x-0 bottom-3 mx-3 border-t  border-black py-2 text-black shadow-black/20 sm:block `}
    >
      <SignedIn />
      <UserButton afterSignOutUrl='/' showName />
      <SignedIn />
    </div>
  );
}
