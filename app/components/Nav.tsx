'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignOutButton } from '../components/AuthButtons';
import AuthCheck from '../components/AuthCheck';
export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/blog'}>Blog</Link>
        </li>
        <li>
          <Link href={'/users'}>Users</Link>
        </li>
        <li>
          <SignInButton />
        </li>

        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  );
}
