// import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Pie } from 'react-chartjs-2'; // Make sure to install this library
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SignOutButton } from '../components/AuthButtons';
import Goals from '../components/Goals';
import { ProfileForm } from './ProfileForm';
import { prisma } from '@/lib/prisma';

// const prisma = new PrismaClient();

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  // const pieData = {
  //   labels: activities.map((activity) => activity.name),
  //   datasets: [
  //     {
  //       data: activities.map((activity) => activity.percentage),
  //       // Add more colors if you have more categories
  //       backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange'],
  //     },
  //   ],
  // };

  const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email ,
      },
    });

  return (
    <div>
      {/* <h1>Welcome, {session.user?.name}!</h1> */}
      <h1>Welcome, {user?.name}!</h1>
      <section>
        {/* <h2>Create Your Goal for Today</h2>
        <button onClick={handleGoalCreation}>Create Goal</button> */}
        <Goals />
      </section>

      <section>
        <h2>Add Activities to Your Goal</h2>
        <div>
          <input
            type='text'
            name='activityName'
            placeholder='Activity Name'
            required
          />
          <input
            type='number'
            name='percentage'
            placeholder='Percentage'
            min='1'
            max='100'
            required
          />
          <input
            type='text'
            name='categoryName'
            placeholder='Category Name'
            required
          />
          <button type='submit'>Add Activity</button>
        </div>
      </section>

      <section>
        <h2>Your Activities for Today</h2>
        {/* <Pie data={pieData} /> */}
      </section>

      <section>
        <h2>Feedback</h2>
      </section>
    </div>
  );
};

export default Dashboard;
