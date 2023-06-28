import { auth } from '@clerk/nextjs';
import Hero from './components/Hero';

export default async function Home() {
  const { userId } = auth();
  return (
    <>
      <Hero userId={userId} />
    </>
  );
}
