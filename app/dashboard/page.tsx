// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect, useSearchParams } from 'next/navigation';
import React from 'react';
import { Pie } from 'react-chartjs-2'; // Make sure to install this library
import { authOptions } from '../api/auth/[...nextauth]/route';
import Activities from '../components/Activities';
import AddActivity from '../components/AddActivity';
import { SignOutButton } from '../components/AuthButtons';
import Goals from '../components/Goals';
import { ProfileForm } from './ProfileForm';

const Dashboard = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <section className='bg-gray'>
        {/* <Goals /> */}
        <Activities />
        <AddActivity />
      </section>
    </div>
  );
};

export default Dashboard;
