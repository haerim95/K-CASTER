import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const App = ({ Component, location }) => {
  const copyRight = useMemo(() => ({ textAlign: 'center', padding: 20 }), []);

  return (
    <>
      <Head>
        <meta charSet='urf-8' />
        <title>K-캐스터</title>
      </Head>
      <Component location={location} />

      <p style={copyRight}>
        <a
          href='https://github.com/haerim95/k-caster'
          target='_blank'
          rel='noreferrer nopener'
        >
          COPYRIGHT@2022
        </a>
      </p>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired
};

export default wrapper.withRedux(App);
