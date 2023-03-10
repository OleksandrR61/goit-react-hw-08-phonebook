import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Layout, Loader } from 'components';
import { getCurrentUser } from 'redux/auth/authOperation';
import { PrivateRoute, PublicRoute } from 'routes';
import { selectIsAuthLoading } from 'redux/auth/authSelectors';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(selectIsAuthLoading);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (isAuthLoading){
    return <Loader />
  }

  return (
    <>
      <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="" element={<PrivateRoute />}>
                <Route path="/contacts" element={<ContactsPage />} />
              </Route>

              <Route path="" element={<PublicRoute />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>
              
              <Route path='*' element={<Navigate to="/" replace={true}/>}/>
            </Routes>
          </Suspense>
      </Layout>
    </>
  );
};