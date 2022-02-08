import React, { useState } from 'react';
import PropTtypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col, Select } from 'antd';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import Weather from './Weather';

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
  const { me } = useSelector(state => state.user);

  const { Option } = Select;
  function onChangeLocation(value) {
    console.log(`지역은 ${value}`);
  }

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
        <Menu.Item key='menu5'>
          <Select
            defaultValue='서울'
            style={{ width: 120 }}
            onChange={onChangeLocation}
          >
            <Option value='Seoul'>서울</Option>
            <Option value='Deajeon'>대전</Option>
            <Option value='Gangneung'>강릉</Option>
            <Option value='Gwangju'>광주</Option>
            <Option value='Busan'>부산</Option>
            <Option value='Jeju'>제주</Option>
          </Select>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={4}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={8}>
          <Weather />
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTtypes.node.isRequired
};

export default AppLayout;
