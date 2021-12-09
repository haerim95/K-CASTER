import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹 <br />
          {me.post.length}
        </div>,
        <div key='followings'>
          팔로잉 <br />
          {me.followings.length}
        </div>,
        <div key='followers'>
          팔로워 <br />
          {me.followers.length}
        </div>,
      ]}
    >
      <Card.Meta title={me.nickname} avatar={<Avatar>{me.nickname}</Avatar>} />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
