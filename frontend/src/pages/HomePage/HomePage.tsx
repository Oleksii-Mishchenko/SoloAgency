import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { MainButton } from '../../components/MainButton';
import { LoaderElement } from '../../types/LoaderElement';
import * as articlesActions from '../../features/articlesSlice';
import './home-page.scss';
import { useEffect } from 'react';
import { Article } from '../../components/Article';
import { SocialMedia } from '../../components/SocialMedia';
import { CallRequest } from '../../components/CallRequest';
import { Errors } from '../../components/Errors';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoadingArticles, errors } = useAppSelector(
    state => state.articles,
  );

  useEffect(() => {
    dispatch(articlesActions.init());
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="home-page__hero">
        <div className="home-page__hero-content">
          <p className="home-page__hero-decorative-text">
            Організовуємо мрії та перетворюємо їх у реальність - ваші події,
            наша справа!
          </p>

          <MainButton
            text="Замовити послугу"
            className="home-page__hero-button"
            disabled
          />
        </div>
      </section>

      <section className="home-page__about-us">
        {isLoadingArticles && (
          <Loader
            element={LoaderElement.Block}
            className="home-page__about-us-loader"
          />
        )}

        {!!articles.length &&
          !errors &&
          articles.map(article => (
            <Article
              key={article.id}
              article={article}
              className="home-page__about-us-article"
            />
          ))}

        {errors && <Errors errors={errors} />}
      </section>

      <section className="home-page__contacts">
        <h1 className="home-page__contacts-title">Наші контакти</h1>

        <div className="home-page__contacts-content">
          <CallRequest />

          <div className="home-page__contacts-items">
            <div className="home-page__contacts-item">
              <p className="home-page__contacts-item-name">Номер телефону</p>

              <p className="home-page__contacts-item-value">+380222222222</p>
            </div>

            <div className="home-page__contacts-item">
              <p className="home-page__contacts-item-name">Електронна адреса</p>

              <p className="home-page__contacts-item-value">
                soloagency@gmail.com
              </p>
            </div>

            <div className="home-page__contacts-item">
              <p
                className="
                  home-page__contacts-item-name
                  home-page__contacts-item-name--social
                "
              >
                Шукайте нас також в соціальних мережах:
              </p>

              <SocialMedia />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// export const HomePage = () => {
//   const [loginData, setLoginData] = useState<LoginData>({
//     email: '',
//     password: '',
//   });
//   const [registerData, setRegisterData] = useState<RegisterData>({
//     email: '',
//     password: '',
//     first_name: '',
//     last_name: '',
//     phone: '',
//   });
//   const dispatch = useAppDispatch();
//   const { authData } = useAppSelector(state => state.auth);

//   const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     dispatch(authActions.login(loginData));
//   };

//   const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     dispatch(authActions.register(registerData));
//   };

//   useEffect(() => {
//     if (authData.token) {
//       dispatch(authActions.getUserByToken(authData.token));
//     }
//   }, [authData.token, dispatch]);

//   return (
//     <div className="home-page">
//       <h2>Home Page</h2>
//       <Loader2 />
//       admin@admin.ua
//       <form onSubmit={event => handleLogin(event)}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={loginData.email}
//           onChange={event =>
//             setLoginData(state => ({ ...state, email: event.target.value }))
//           }
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={loginData.password}
//           onChange={event =>
//             setLoginData(state => ({ ...state, password: event.target.value }))
//           }
//         />
//         <button>Log in</button>
//       </form>
//       <br />
//       <form onSubmit={event => handleRegister(event)}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={registerData.email}
//           onChange={event =>
//             setRegisterData(state => ({ ...state, email: event.target.value }))
//           }
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={registerData.password}
//           onChange={event =>
//             setRegisterData(state => ({
//               ...state,
//               password: event.target.value,
//             }))
//           }
//         />
//         <input
//           type="text"
//           placeholder="First name"
//           value={registerData.first_name}
//           onChange={event =>
//             setRegisterData(state => ({
//               ...state,
//               first_name: event.target.value,
//             }))
//           }
//         />
//         <input
//           type="text"
//           placeholder="Last name"
//           value={registerData.last_name}
//           onChange={event =>
//             setRegisterData(state => ({
//               ...state,
//               last_name: event.target.value,
//             }))
//           }
//         />
//         <input
//           type="tel"
//           placeholder="Phone number"
//           value={registerData.phone}
//           onChange={event =>
//             setRegisterData(state => ({
//               ...state,
//               phone: event.target.value,
//             }))
//           }
//         />
//         <button>Register</button>
//       </form>
//     </div>
//   );
// };
