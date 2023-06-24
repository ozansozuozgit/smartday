import { ClerkProvider } from '@clerk/nextjs';
import { ReduxProvider } from '../redux/provider';
import './globals.css';

import { Montserrat, Open_Sans } from 'next/font/google';

const lato = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang='en' className={`${montserrat.variable} ${lato.variable}`}>
          <body>
            {/* <Nav /> */}
            <div className='main-body'>
              {props.modal}
              {props.children}
            </div>
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
