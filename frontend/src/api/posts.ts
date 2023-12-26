import { Post } from '../types/Post';
import { client } from '../utils/axiosClient';

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const createPost = (postData: Omit<Post, 'id'>) => {
  return client.post<Post, Omit<Post, 'id'>>(`/posts`, postData);
};
