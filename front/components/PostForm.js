import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const [text, onChangeText] = useState('');
  const onSubmit = useCallback(() => {}, []);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType='multipart/form-data'
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='오늘의 체감날씨는 어떤가요?'
      />
      <div>
        <input type='file' multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type='primary' style={{ float: 'right' }} htmlType='submit'>
          올리기
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          <div key={v} style={{ width: '200px' }} alt={v}></div>;
        })}
      </div>
    </Form>
  );
};

export default PostForm;
