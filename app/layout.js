"use client"
import './styles/globals.scss'
import { Provider } from 'react-redux';
import store from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

let persistor = persistStore(store);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
