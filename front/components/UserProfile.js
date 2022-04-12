import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import styled from 'styled-components';
import Link from 'next/link';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector(state => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const Wrapper = styled(Card)`
    margin-top: 10px;
  `;

  return (
    <Wrapper
      actions={[
        <div key='twit'>
          <Link href={`/user/${me.id}`}>
            <a>
              게시글 <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key='followings'>
          <Link href='/profile'>
            <a>
              팔로잉 <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key='followers'>
          <Link href='/profile'>
            <a>
              팔로워 <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Wrapper>
  );
};

export default UserProfile;
