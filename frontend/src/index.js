import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router';
import { AuthProvider } from './context/AuthContext';
import {Provider} from "react-redux";
import { store } from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </AuthProvider>

  
);

