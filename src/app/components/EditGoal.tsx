'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { editGoalName } from '@/src/redux/features/userSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '@/src/utils/toast';
import { Dialog, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import { Fragment, useState } from 'react';

const EditGoal = ({ closeEditGoal, goal }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [goalName, setGoalName] = useState(goal.name);
  const dispatch = useAppDispatch();

  const editGoal = async () => {
    if (!goalName) {
      showWarningToast('Please enter a goal name');
      return;
    }
    try {
      const res = await fetch(
        `${getBaseUrl()}/api/goal/?goalId=${goal.id}&action=update`,
        {
          method: 'PATCH',
          body: JSON.stringify({ goalName }),
        }
      );
      const editedGoal = await res.json();
      console.log('Goal edited!', editedGoal);
      dispatch(editGoalName({ id: editedGoal?.id, name: editedGoal?.name }));
      closeEditGoal();
      showSuccessToast('Goal name updated!');
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      showErrorToast('Something went wrong');
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeEditGoal}>
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
                    Edit Goal Name
                  </Dialog.Title>
                  <div className='mt-2 font-open_sans'>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      className='sm:text-md text-md my-5 block w-full rounded-md border-0 py-4 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          editGoal();
                        }
                      }}
                      placeholder={`${goal.name}`}
                    />
                  </div>
                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeEditGoal}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={editGoal}
                    >
                      Submit
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

export default EditGoal;
