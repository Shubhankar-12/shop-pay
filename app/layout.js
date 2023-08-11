"use client"
import "./styles/globals.scss"
import { Provider } from 'react-redux';
import store from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Head from "next/head";


let persistor = persistStore(store);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>
          Shoppay
        </title>
        <meta name='description' content="Shoppay app" />
      </Head>
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
