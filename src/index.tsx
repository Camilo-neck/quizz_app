// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// React Router
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Provider } from 'react-redux';
import store from '@redux/store';

// Styles
import '@/index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Components
import App from '@/App';
import Login from '@/pages/auth/login';
import Students from '@/pages/manage/students';
import RequireAuth from '@/components/requireAuth';
import RequireNotAuth from '@/components/requireNotAuth';
import Questions from '@/pages/manage/questions';

// Web Vitals
import reportWebVitals from '@/reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><App /></RequireAuth>,
  },
  {
    path: "/auth/login",
    element: <RequireNotAuth><Login /></RequireNotAuth> ,
  },
  {
    path: "/manage/students",
    element: <RequireAuth><Students /></RequireAuth>,
  },
  {
    path: "/manage/questions",
    element: <RequireAuth><Questions /></RequireAuth>,
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
