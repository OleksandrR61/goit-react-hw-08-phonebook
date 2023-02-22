import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'components';
import { getCurrentUser } from 'redux/auth/authOperation';
import { PrivateRoute, PublicRoute } from 'routes';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="/contacts" element={
                <PrivateRoute component={<ContactsPage />} />
              } />
              
              <Route path="/register" element={
                <PublicRoute component={<RegisterPage />} />
              } />
              
              <Route path="/login" element={
                <PublicRoute component={<LoginPage />} />
              } />
              
              <Route path='*' element={<HomePage />}/>
            </Routes>
          </Suspense>
      </Layout>
    </>
  );
};