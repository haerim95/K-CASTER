import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, id } = useSelector(
    state => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, []);

  useEffect(() => {
    if (
      inView &&
      hasMorePosts &&
      !loadPostsLoading &&
      document.documentElement.clientHeight <
        document.documentElement.scrollHeight
    ) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts, id]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
    </AppLayout>
  );
};

export default Home;
