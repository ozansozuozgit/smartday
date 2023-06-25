import { getBaseUrl } from '@/lib/getBaseUrl';
import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CreateCategory from './CreateCategory';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const Categories = ({ setSelectedCategoryHandler, selectedCategory }: any) => {
  const [categories, setCategories] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(selectedCategory);

  const addCategoryToState = (category: any) => {
    setCategories([...categories, category]);
  };

  const setSelectedCategory = (category: any) => {
    setSelectedCategoryHandler(category.id);
    setSelected(category);
  };

  //   const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    setSelectedCategoryHandler(null);
    setSelected(null);
    setQuery('');

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const allCategories = await res.json();
        setCategories(allCategories);
        console.log('categories', allCategories);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((category: any) =>
          category.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className='flex items-end  gap-2'>
      <label htmlFor='category' className='sr-only'>
        Select a category
      </label>

      <Combobox value={selected} onChange={setSelectedCategory}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            {query === '' && (
              <div className='text-gray-500 text-sm'>Optional</div>
            )}
            <Combobox.Input
              className='block w-full rounded-md border-0 py-4 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:text-md sm:leading-6 '
              displayValue={(category: any) => category?.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Select a category'
              id='category'
            />

            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10'>
              {filteredCategories.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredCategories.map((category: any) => (
                  <Combobox.Option
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue text-white' : 'text-black'
                      }`
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {category.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-black' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <CreateCategory addCategoryToState={addCategoryToState} />
    </div>
  );
};
export default Categories;
