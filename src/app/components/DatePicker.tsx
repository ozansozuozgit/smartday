'use client';
import { useCalendarChange } from '@/src/hooks/useCalendarChange';

import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BsCalendar3 } from 'react-icons/bs';
import '../calendar.css';
import TodayButton from './TodayButton';

const DatePicker = () => {
  const { value, handleCalendarChange } = useCalendarChange();
  const formatDate = (date: any) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  const formattedStartDate = value[0] ? formatDate(value[0]) : '';
  const formattedEndDate = value[1] ? formatDate(value[1]) : '';

  return (
    <div className='flex w-full flex-col justify-between gap-y-2'>
      <div className='flex gap-x-3 2xl:justify-between xl:gap-2'>
        <TodayButton handleCalendarChange={handleCalendarChange} />
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button
                id='popover-button'
                className={`${open ? '' : 'text-opacity-90'}
                  group inline-flex items-center justify-between rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                Select Date
                <BsCalendar3 className='ml-2 h-3 w-3 text-white transition-colors duration-300 sm:h-4 sm:w-4' />
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
                <Popover.Panel className='absolute z-20'>
                  <div className='overflow-hidden rounded-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5'>
                    <div className='relative'>
                      <Calendar
                        onChange={handleCalendarChange}
                        value={value}
                        selectRange
                        calendarType='US'
                        maxDate={new Date()}
                      />
                    </div>
                    <div className='bg-white p-4'>
                      <Popover.Button className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
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
      </div>

      <h3 className='hidden font-roboto text-xs font-semibold 2xl:block'>
        {formattedStartDate} - {formattedEndDate}
      </h3>
    </div>
  );
};

export default DatePicker;
