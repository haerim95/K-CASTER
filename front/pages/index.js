import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { END } from 'redux-saga';
import { Row, Col } from 'antd';
import AppLayout from '../components/AppLayout';
import Weather from '../components/Weather';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import WeatherButton from '../components/WeatherButton';

const Home = ({}) => {
  const LocationWrapper = styled.div`
    margin-bottom: 10px;
    width: '100%';
    display: flex;
    vertical-align: middle;
    padding: 10px;
    background-color: #f7f5f2;
    border-radius: 4px;
  `;

  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, id, retweetError } =
    useSelector(state => state.post);
  const [location, setLocation] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    setLocation('Seoul');
  }, []);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  const onLocationSelect = useCallback(
    e => {
      setLocation(e.target.value);
    },
    [active]
  );

  return (
    <AppLayout>
      <Row gutter={8}>
        <Col xs={24} md={10}>
          <Weather location={location} />
        </Col>
        <Col xs={24} md={14}>
          <>
            <LocationWrapper>
              <WeatherButton
                active={active}
                location={location}
                onLocationSelect={onLocationSelect}
              />
            </LocationWrapper>
            {me && <PostForm />}
            {mainPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
          </>
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
