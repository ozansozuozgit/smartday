import { ClerkProvider } from '@clerk/nextjs';
import { ReduxProvider } from '../redux/provider';
import './globals.css';


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
        <html lang='en'>
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
