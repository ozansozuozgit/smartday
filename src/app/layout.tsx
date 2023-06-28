import { ClerkProvider } from '@clerk/nextjs';
import { ReduxProvider } from '../redux/provider';
import './globals.css';

import { Montserrat, Open_Sans,Roboto } from 'next/font/google';

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
})
export const metadata = {
  title: 'Time Spent',
  description: 'Time Spent is a time tracking app to help you stay productive.',
};
export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang='en' className={`${montserrat.variable} ${open_sans.variable} ${roboto.variable}`}>
          <body>
            {/* <Nav /> */}
            <div className='main-body overflow-hidden'>
              {props.modal}
              {props.children}
            </div>
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
