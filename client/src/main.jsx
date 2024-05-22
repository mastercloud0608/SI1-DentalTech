import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import {
  QueryClientProvider, QueryClient
} from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

document.body.style.backgroundColor = "#1A202C";
document.body.style.fontFamily = "Poppins, sans-serif";
// document.body.style.overflow = "hidden";


//react query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools/>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
