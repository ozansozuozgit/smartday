'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '@/src/utils/toast';
import { Dialog, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import React, { Fragment, useRef, useState } from 'react';
import { GoalType } from '../../../types/types';

const CreateCategory = ({ addCategoryToState }: any) => {
  const [categoryName, setCategoryName] = useState<string>('');
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createCategory = async () => {
    if (!categoryName) {
      showWarningToast('Please enter a category name');
      return;
    }
    try {
      const res = await fetch(`${getBaseUrl()}/api/category`, {
        method: 'POST',
        body: JSON.stringify({
          categoryName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const category = await res.json();
      addCategoryToState(category);
      closeModal();
      showSuccessToast('Category added!');
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      showErrorToast('Something went wrong');
    }
  };

  return (
    <div className='flex w-[30%] items-end'>
      <>
        <div className='flex items-center justify-center '>
          <button
            type='button'
            onClick={openModal}
            className='rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
          >
            Create Category
          </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                  <Dialog.Panel className='w-full max-w-[300px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className='font-roboto text-lg font-medium leading-6 text-gray-900'
                    >
                      Enter Category Name
                    </Dialog.Title>
                    <div className='mt-2 font-open_sans'>
                      <input
                        type='text'
                        name='price'
                        id='price'
                        className='sm:text-md my-5 block w-full rounded-md border-0 py-4 pl-4 pr-20 text-lg text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault(); // Prevents form submission
                            createCategory();
                          }
                        }}
                        placeholder='Fitness'
                      />
                    </div>

                    <div className='mt-4 flex justify-end space-x-2'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2'
                        onClick={createCategory}
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
    </div>
  );
};

export default CreateCategory;
