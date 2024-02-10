import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as authActions from './features/authSlice';
import * as userActions from './features/userSlice';
import { Header, Main, Footer } from './components/common';
import { Register, Login } from './components/UI/forms';
import { Notification } from './components/UX';
import './App.scss';

export const App = () => {
  const { token, isLoginFormOpen, isRegisterFormOpen, errors } = useAppSelector(
    state => state.auth,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(userActions.getUserByToken(token));
    }
  }, [token]);

  return (
    <div className="App">
      <Header />

      <Main />

      <Footer />

      {isLoginFormOpen && <Login />}

      {isRegisterFormOpen && <Register />}

      {errors && (
        <Notification
          className="App__notification"
          errors={errors}
          message="Авторизація невдала"
          onClose={() => dispatch(authActions.clearErrors())}
        />
      )}
    </div>
  );
};
