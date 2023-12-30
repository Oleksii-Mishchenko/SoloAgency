import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoginData } from '../../types/LoginData';
import * as authActions from '../../features/authSlice';
import { RegisterData } from '../../types/RegisterData';

export const HomePage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
  });
  const dispatch = useAppDispatch();
  const { authData } = useAppSelector(state => state.auth);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(authActions.login(loginData));
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(authActions.register(registerData));
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
          placeholder="Email"
          value={loginData.email}
          onChange={event =>
            setLoginData(state => ({ ...state, email: event.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={event =>
            setLoginData(state => ({ ...state, password: event.target.value }))
          }
        />
        <button>Log in</button>
      </form>
      <br />
      <form onSubmit={event => handleRegister(event)}>
        <input
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={event =>
            setRegisterData(state => ({ ...state, email: event.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={event =>
            setRegisterData(state => ({
              ...state,
              password: event.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="First name"
          value={registerData.first_name}
          onChange={event =>
            setRegisterData(state => ({
              ...state,
              first_name: event.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Last name"
          value={registerData.last_name}
          onChange={event =>
            setRegisterData(state => ({
              ...state,
              last_name: event.target.value,
            }))
          }
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={registerData.phone}
          onChange={event =>
            setRegisterData(state => ({
              ...state,
              phone: event.target.value,
            }))
          }
        />
        <button>Register</button>
      </form>
    </div>
  );
};
