'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import {
  removeActivityFromAllActivities,
  removeActivityFromSelectedGoal,
  setActivityFlag,
  updateSelectedGoalPercentage,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import * as Sentry from '@sentry/nextjs';

const DeleteActivity = ({
  closeDeleteActivity,
  activity,
  isDeleteActivityOpen,
}: any) => {
  const dispatch = useAppDispatch();
  const goal = useAppSelector((state) => state.user.selectedGoal);
  const activityFlag = useAppSelector((state) => state.user.activityFlag);

  const deleteActivity = async () => {
    try {
      const newPercentage = goal.percentage - activity?.percentage;
      const res = await fetch(
        `${getBaseUrl()}/api/activity?activityId=${activity.id}&goalId=${goal.id}&newPercentage=${newPercentage}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const deletedActivity = await res.json();
      dispatch(updateSelectedGoalPercentage(newPercentage));
      dispatch(removeActivityFromSelectedGoal(deletedActivity?.id));
      dispatch(setActivityFlag(!activityFlag));
      dispatch(removeActivityFromAllActivities(deletedActivity?.id));
      closeDeleteActivity();
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
    }
  };

  return (
    <>
      <Transition appear show={isDeleteActivityOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={closeDeleteActivity}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Delete {activity.name}
                  </Dialog.Title>
                  <div className='mt-2 font-open_sans'>
                    <p className='text-md text-gray-800'>
                      This action is irreversible. Are you sure you want to
                      delete this activity?
                    </p>
                  </div>

                  <div className='mt-4 flex gap-2 font-open_sans'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      onClick={deleteActivity}
                    >
                      Yes
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeDeleteActivity}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteActivity;
