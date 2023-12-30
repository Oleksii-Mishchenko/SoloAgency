import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoginData } from '../../types/LoginData';
import * as authActions from '../../features/authSlice';

export const HomePage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const { authData } = useAppSelector(state => state.auth);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(authActions.login(loginData));
  };

  useEffect(() => {
    if (authData.token) {
      dispatch(authActions.getUserByToken(authData.token));
    }
  }, [authData.token, dispatch]);

  return (
    <div className="home-page">
      <h2>Home Page</h2>
      admin@admin.ua
      <form onSubmit={event => handleLogin(event)}>
        <input
          type="email"
          value={loginData.email}
          onChange={event =>
            setLoginData(state => ({ ...state, email: event.target.value }))
          }
        />
        <input
          type="password"
          value={loginData.password}
          onChange={event =>
            setLoginData(state => ({ ...state, password: event.target.value }))
          }
        />
        <button>Log in</button>
      </form>
      <br />
      <form>
        <input type="email" />
        <input type="password" />
        <input type="password" />
        <button>Register</button>
      </form>
    </div>
  );
};
