import React, { ReactNode } from 'react';
import ReduxProvider from 'store/ReduxProvider';
import AppWrappers from './AppWrappers';
 
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <ReduxProvider>
        <AppWrappers>{children}</AppWrappers>
        </ReduxProvider>
      </body>
    </html>
  );
}
