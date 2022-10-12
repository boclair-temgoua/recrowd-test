import { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Import Swiper style
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastify-js/src/toastify.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Script from 'next/script'
import '../../styles/App.css';


//Modal Video
import Head from 'next/head';
import { Fragment } from 'react';


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></Script>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />


        </Head>
        <Component {...pageProps} />
      </Fragment>
      {Boolean(process.env.REACT_APP_QUERY_DEV_TOOLS) && (<ReactQueryDevtools initialIsOpen={false} />)}
    </QueryClientProvider>


  );
}

export default MyApp
