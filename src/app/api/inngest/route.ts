import { serve } from 'inngest/next';
import { inngest } from '../../../inngest/client';
import { helloWorld, resetGoal } from '../../../inngest/functions';

export const { GET, POST, PUT } = serve(inngest, [
  helloWorld, // <-- This is where you'll always add your new functions
  resetGoal,
]);
