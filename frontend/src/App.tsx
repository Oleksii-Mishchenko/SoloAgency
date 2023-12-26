import { Outlet } from 'react-router-dom';
import './App.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsAction from './features/postsSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const { posts, error } = useAppSelector(store => store.posts);
  const showPosts = !!posts.length && !error;

  return (
    <div className="App">
      <h1 className="App__title">Solo Agency</h1>
      <Link to={'home'}>Home</Link>
      <Link to={'about-us'}>About us</Link>
      <Link to={'faq'}>FAQ</Link>
      <Link to={'contacts'}>Contacts</Link>
      <Link to={'services'}>Services</Link>
      <Link to={'anypage'}>Page not found</Link>
      <Outlet />

      <button onClick={() => dispatch(postsAction.loadPosts())}>
        Get posts
      </button>

      <button
        onClick={() =>
          dispatch(
            postsAction.uploadPost({
              userId: 12,
              title: 'string',
              body: 'qwerty',
            }),
          )
        }
      >
        Load Post
      </button>

      {error && <p>{error}</p>}

      {showPosts &&
        posts.map(post => {
          return <h1 key={post.id}>{post.title}</h1>;
        })}
    </div>
  );
};
