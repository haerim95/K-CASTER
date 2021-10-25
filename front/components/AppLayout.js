import React from 'react';
import PropTtypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href='/'>
          <a>익명의 캐스터</a>
        </Link>
        <Link href='/profile'>
          <a>프로필</a>
        </Link>
        <Link href='/signup'>
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTtypes.node.isRequired,
};

export default AppLayout;
