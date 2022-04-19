import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import Password from 'antd/lib/input/Password';
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const ErrorMessage = styled.div`
  color: red;
`;

const InputStyle = styled.div`
  margin-bottom: 15px;
  margin: 0 auto;
  input {
    max-width: 450px;
  }
`;
const Notice = styled.div`
  margin: 15px 0 10px;
  max-width: 600px;

  padding: 20px;
  background-color: #f7f5f2;
  p {
    margin: 0px;
    margin-bottom: 5px;
    color: #222222;
  }
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    state => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    // 가입완료 후 메인페이지 이동
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickName] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 비밀번호 체크
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [passwordError, setPasswordError] = useState(false);

  // 비밀번호 중복 체크
  useEffect(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
    } else if (password === passwordCheck) {
      setPasswordError(false);
    }
  }, [password, passwordCheck]);

  // 이용약관
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  // 버튼 스타일 객체 리렌더링 방지
  const style = useMemo(() => ({ marginTop: 10 }), []);

  // 제출
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname }
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | K-캐스터</title>
      </Head>
      <Form onFinish={onSubmit}>
        <InputStyle>
          <label htmlFor='user-email'>이메일</label> <br />
          <Input
            name='user-email'
            value={email}
            type='email'
            required
            onChange={onChangeEmail}
          />
        </InputStyle>
        <InputStyle>
          <label htmlFor='user-nick'>닉네임</label> <br />
          <Input
            name='user-nick'
            value={nickname}
            required
            onChange={onChangeNickName}
          />
        </InputStyle>
        <InputStyle>
          <label htmlFor='user-password'>비밀번호</label> <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            required
            onChange={onChangePassword}
          />
        </InputStyle>
        <InputStyle>
          <label htmlFor='user-password-check'>비밀번호 체크</label> <br />
          <Input
            name='user-password-check'
            type='password'
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </InputStyle>
        <Notice>
          <p>
            본 사이트는 포트폴리오 사이트입니다. 인지 후 가입을 진행해주세요.
          </p>
          <p>가입하기 귀찮으시다면 하단의 정보로 로그인 진행해주세요.</p>
          <p>아이디 : test@test.com 비밀번호 : 123qwe!</p>
          <p>
            테스트 아이디를 이용하시더라도 사이트를 즐겨주시면 감사하겠습니다.
            :)
          </p>
          <p>신규 가입도 환영합니다!</p>
        </Notice>
        <InputStyle>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && (
            <ErrorMessage>약관에 동의해주셔야 합니다.</ErrorMessage>
          )}
        </InputStyle>
        <InputStyle style={style}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </InputStyle>
      </Form>
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
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;
