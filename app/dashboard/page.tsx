// import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Pie } from 'react-chartjs-2'; // Make sure to install this library
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SignOutButton } from '../components/AuthButtons';
import Goals from '../components/Goals';
import { ProfileForm } from './ProfileForm';
import AddActivity from '../components/AddActivity';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
      <section>
        {/* <Goals /> */}
        <AddActivity />
      </section>
    </div>
  );
};

export default Dashboard;
