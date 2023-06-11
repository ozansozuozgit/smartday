'use client';
import { GoalType } from '@/types/types';
import React from 'react';

const Goal = ({ goal }: { goal: GoalType }) => {
  return (
    <div>
      <h2>{goal.name}</h2>
    </div>
  );
};

export default Goal;
