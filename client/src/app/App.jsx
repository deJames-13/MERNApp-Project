import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { Spinner } from '@common';
import { useNotification } from '@custom';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import router from '@app/routes';
import React from 'react';
function App() {
  useNotification();
  const { isLoading, silentLoading } = useSelector(state => state.loading);

  return (
    <React.StrictMode>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
      />
      <RouterProvider router={router} className={isLoading ? 'cursor-wait pointer-events-none' : ''} />
      {isLoading && !silentLoading &&
        <div className="fixed top-0 left-0 z-[100] h-screen w-screen  cursor-wait">
          <Spinner />
        </div>
      }
    </React.StrictMode>
  );
}

export default App;
