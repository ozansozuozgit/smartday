// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
import { SignOutButton, auth } from '@clerk/nextjs';
import Link from 'next/link';

// import { SignInButton } from './components/AuthButtons';

// import { authOptions } from './api/auth/[...nextauth]/route';
export default async function Home() {
  // const session = await getServerSession(authOptions);
  const { userId } = auth();

  console.log('userId', userId);

  // if (session) {
  //   redirect('/dashboard');
  // }

  return (
    <main>
      {/* <SignInButton /> */}
      {!userId && (
        <Link className='font-mono font-bold' href='/sign-in'>
          Sign In
        </Link>
      )}
      {!userId && (
        <Link className='font-mono font-bold' href='/sign-up'>
          Sign up
        </Link>
      )}
      {userId && <SignOutButton />}
    </main>
  );
}
