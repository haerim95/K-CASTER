import React, { useState } from 'react';
import PropTtypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col::first-child{
    padding-left: 0 !important;
  }

  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: 'middle';
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
      <Menu mode='horizontal'>
        <Menu.Item key='menu1'>
          <Link href='/'>
            <a>익명의 캐스터</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='menu2'>
          <Link href='/profile'>
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='menu3'>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key='menu4'>
          <Link href='/signup'>
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={4}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={8}>
          오른쪽 메뉴
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTtypes.node.isRequired,
};

export default AppLayout;
