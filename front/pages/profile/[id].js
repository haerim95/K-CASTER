import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'antd';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import Router from 'next/router';
import NicknameEditForm from '../../components/NicknameEditForm';
import FollowList from '../../components/FollowList';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import useSWR from 'swr';
import { LOAD_ME_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../../components/PostCard';
import { useRouter } from 'next/router';
import { backUrl } from '../../config/config';

const fetcher = url =>
  axios.get(url, { withCredentials: true }).then(result => result.data);

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector(state => state.post);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const router = useRouter();
  const { id } = router.query;

  const { data: followersData, error: followerError } = useSWR(
    `${backUrl}/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `${backUrl}/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  useEffect(() => {
    if (!(me && me.id)) {
      alert('로그인을 해주세요! 🙏');
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_ME_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: id
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit(prev => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit(prev => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>'팔로잉 팔로워 로딩 중 에러가 발생합니다.'</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | K-캐스터</title>
      </Head>
      <AppLayout>
        <Row gutter={8}>
          <Col xs={24} md={8}>
            <NicknameEditForm />
            <FollowList
              header='팔로잉'
              data={followingsData}
              onClickMore={loadMoreFollowings}
              loading={!followingsData && !followingError}
            />
            <FollowList
              header='팔로워'
              data={followersData}
              onClickMore={loadMoreFollowers}
              loading={!followersData && !followerError}
            />
          </Col>
          <Col xs={24} md={16}>
            {mainPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </Col>
        </Row>
      </AppLayout>
    </>
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
    type: LOAD_ME_POSTS_REQUEST,
    data: context.params.id
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  console.log('getState', context.store.getState().post.mainPosts);
  return { props: {} };
});

export default Profile;
