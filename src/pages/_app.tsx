import '../styles/global.css';
import '../styles/reset-min.css';
import '../styles/satellite-min.css';
import { ThemeProvider } from '@material-tailwind/react';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
