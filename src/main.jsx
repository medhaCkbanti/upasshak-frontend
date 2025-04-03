import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, } from "react-router-dom";
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import router from './router/index.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);