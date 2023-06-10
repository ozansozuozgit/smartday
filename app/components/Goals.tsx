'use client';
import React, { useRef, useState } from 'react';
import './Goals.css';
const Goals = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // form inputs
  const [goalName, setGoalName] = useState<string>('');

  const openGoalDialog = () => {
    console.log('Goal added!');
    if (dialogRef?.current) {
      dialogRef?.current.showModal();
    }
  };
  const closeGoalDialog = () => {
    if (dialogRef?.current) {
      dialogRef?.current.close();
    }
  };
  const addGoal = async () => {
    // Logic for adding a new goal
    if (!goalName) return;
    const res = await fetch('/api/goals', {
      method: 'POST',
      body: JSON.stringify({ goalName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log('res', res);
    console.log('Goal added!');
  };
  return (
    <div>
      <h1>Goals</h1>
      <button onClick={openGoalDialog}>Add Goal</button>
      <dialog ref={dialogRef} className='dialog-goals'>
        <h2>Goal name</h2>
        <input
          type='text'
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
        <div>
          <button onClick={closeGoalDialog}>Cancel</button>
          <button onClick={addGoal}>Confirm</button>
        </div>
      </dialog>
    </div>
  );
};

export default Goals;
