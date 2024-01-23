import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as authActions from './features/authSlice';
import { Notification } from './components/Notification';
import './App.scss';

export const App = () => {
  const { isLoginFormOpen, errors } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <Header />

      <Main />

      <Footer />

      {isLoginFormOpen && <Login />}

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
