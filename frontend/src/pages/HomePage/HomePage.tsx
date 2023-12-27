import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { LoginData } from '../../types/LoginData';
import * as userActions from '../../features/userSlice';

export const HomePage = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  return (
    <div className="home-page">
      <h2>Home Page</h2>

      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch(userActions.loginUser(loginData));
        }}
      >
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
