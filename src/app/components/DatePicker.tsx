'use client';
import {
  setEndDate,
  setSelectedGoal,
  setStartDate,
} from '@/src/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendar.css';

import { useCalendarChange } from '@/src/hooks/useCalendarChange';
import React from 'react';

// TODO: Adjust the maxDate to be the EST time not System time
const DatePicker = () => {
  const { value, handleCalendarChange } = useCalendarChange();

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? '' : 'text-opacity-90'}
              group inline-flex items-center rounded-md bg-orange px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Select Time</span>
            <ChevronDownIcon
              className={`${
                open ? 'transform rotate-180' : ''
              } ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden='true'
            />
          </Popover.Button>
          <Transition
            as={React.Fragment}
            show={open}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute z-10 mt-2 transform -translate-x-1/2 ml-70'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-100'>
                <div className='relative'>
                  <Calendar
                    onChange={handleCalendarChange as any}
                    value={value as any}
                    selectRange
                    calendarType='US'
                    maxDate={new Date()}
                  />
                </div>
                <div className='bg-gray-50 p-4'>
                  <Popover.Button className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange focus-visible:ring-opacity-50'>
                    <span className='flex items-center'>
                      <span className='text-sm font-medium text-gray-900'>
                        Close
                      </span>
                    </span>
                  </Popover.Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DatePicker;
