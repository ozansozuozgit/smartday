'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';

export default function NavAuth() {
  return (
    <div
      className={`absolute sm:block inset-x-0 bottom-3 mx-3  shadow-black/20 border-t border-black py-2 text-black `}
    >
      <SignedIn />
      <UserButton afterSignOutUrl='/' showName />
      <SignedIn />
    </div>
  );
}
