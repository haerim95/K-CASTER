import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import Password from 'antd/lib/input/Password';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(state => state.user);

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
        <title>회원가입 | 익명의 캐스터</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor='user-email'>이메일</label> <br />
          <Input
            name='user-email'
            value={email}
            type='email'
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor='user-nick'>닉네임</label> <br />
          <Input
            name='user-nick'
            value={nickname}
            required
            onChange={onChangeNickName}
          />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label> <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
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
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && (
            <ErrorMessage>약관에 동의해주셔야 합니다.</ErrorMessage>
          )}
        </div>
        <div style={style}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
