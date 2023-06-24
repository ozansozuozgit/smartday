import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <SignUp
        afterSignUpUrl='/dashboard'
        signInUrl='/sign-in'
        redirectUrl='/dashboard'
      />
    </main>
  );
}
