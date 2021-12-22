import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import Router from 'next/router';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { me } = useSelector(state => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      alert('로그인을 해주세요! 🙏');
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | 익명의 캐스터</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉' data={me.followings} />
        <FollowList header='팔로워' data={me.followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
