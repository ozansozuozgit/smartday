'use client';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { showErrorToast, showSuccessToast } from '@/src/utils/toast';
import { Dialog, Transition } from '@headlessui/react';
import * as Sentry from '@sentry/nextjs';
import { Fragment, useRef, useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().nonempty({ message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().nonempty({ message: 'Please enter a subject.' }),
  message: z.string().nonempty({ message: 'Please enter a message.' }),
});
function ContactModal({ onClose }: any) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const formSubmitted = useRef(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formSubmitted.current = true;
    const result = schema.safeParse(formData);
    if (result.success) {
      try {
        const res = await fetch(`${getBaseUrl()}/api/contact`, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        showSuccessToast('Email sent successfully');
      } catch (err) {
        console.log(err);
        Sentry.captureException(err);
        showErrorToast('Something went wrong');
      }
    } else {
      setErrors(result.error.formErrors.fieldErrors);
    }
  };

  const showError = (field) => {
    return formSubmitted.current && errors[field] && <p>{errors[field]}</p>;
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={onClose}
      >
        <div className='min-h-screen px-4 text-center'>
          <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          {/* This div is used to encourage the modal contents to slide in from off-screen */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                Contact / Feedback
              </Dialog.Title>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='name'
                  placeholder='Your Name'
                  value={formData.name}
                  onChange={handleChange}
                  className='mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2'
                />
                {showError('name') && (
                  <p className='text-xs text-red-600'>{showError('name')}</p>
                )}
                <input
                  type='text'
                  name='email'
                  placeholder='Your Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2'
                />
                {showError('email') && (
                  <p className='text-xs text-red-600'>{showError('email')}</p>
                )}
                <input
                  type='text'
                  name='subject'
                  placeholder='Subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2'
                />
                {showError('subject') && (
                  <p className='text-xs text-red-600'>{showError('subject')}</p>
                )}
                <textarea
                  name='message'
                  placeholder='Your Message'
                  value={formData.message}
                  onChange={handleChange}
                  className='mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2'
                />
                {showError('message') && (
                  <p className='text-xs text-red-600'>{showError('message')}</p>
                )}

                <div className='mt-4 flex space-x-2'>
                  <button
                    type='submit'
                    className='mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  >
                    Send
                  </button>
                  <button
                    type='button'
                    className='mt-4 inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ContactModal;
