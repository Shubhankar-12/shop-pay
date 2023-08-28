"use client"
import "./styles/globals.scss"
import store from './store/index';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Head from "next/head";
import SProvider from "./components/SessionProvider"


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
        <SProvider>
          <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </SProvider>
      </body>
    </html>
  )
}
