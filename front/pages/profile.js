import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [
    { nickname: '양천구' },
    { nickname: '서대문구' },
    { nickname: '강남구' },
  ];
  const followingList = [
    { nickname: '양천구' },
    { nickname: '서대문구' },
    { nickname: '강남구' },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | 익명의 캐스터</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
