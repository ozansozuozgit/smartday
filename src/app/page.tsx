// import { redirect } from 'next/navigation';
import { SignOutButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import Hero from './components/Hero';
// import { SignInButton } from './components/AuthButtons';

export default async function Home() {
  const { userId } = auth();

  console.log('userId', userId);

  // if (session) {
  //   redirect('/dashboard');
  // }

  return (
    <>
      {/* <SignInButton /> */}
      {/* {!userId && (
        <Link className='font-mono font-bold' href='/sign-in'>
          Sign In
        </Link>
      )}
      {!userId && (
        <Link className='font-mono font-bold' href='/sign-up'>
          Sign up
        </Link>
      )}
      {userId && <SignOutButton />} */}
      <Hero />
    </>
  );
}
