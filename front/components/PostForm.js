import { Button, Form, Input } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST
} from '../reducers/post';
import styled from 'styled-components';
import WeatherButton from './WeatherButton';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');
  const [locationForm, setLocationForm] = useState('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onLocationSelect = useCallback(
    e => {
      setLocationForm(e.target.value);
      console.log(locationForm);
    },
    [locationForm]
  );

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요');
    }
    const formData = new FormData();
    imagePaths.forEach(p => {
      formData.append('image', p);
    });
    formData.append('content', text);
    formData.append('location', locationForm);
    console.log(formData);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(e => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  }, []);

  const onRemoveImage = useCallback(index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
  });

  const buttonWrapper = useMemo(() => ({ marginTop: 10 }), []);
  const inputStyle = useMemo(() => ({ resize: 'none' }), []);

  const PreviewWrapper = styled.div`
    display: flex;
    flex-flow: wrap;

    justify-content: 'center';
    margin-top: 10px;
  `;

  const CloseBtn = styled(Button)`
    position: 'absolute';
    top: 10px;
    right: 30px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    padding: 0;
    color: #ffffff;
    font-size: 12px;
  `;

  const LocationWrapper = styled.div`
    margin-bottom: 10px;
    width: '100%';
    vertical-align: middle;
    padding: 10px;
    background-color: #f7f5f2;
    border-radius: 4px;
  `;

  return (
    <Form
      style={{
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#F7F5F2',
        border: '1px solid #EEEEEE'
      }}
      encType='multipart/form-data'
      onFinish={onSubmit}
    >
      <LocationWrapper>
        <p>어느 지역에서 작성중인가요?</p>
        <WeatherButton
          location={locationForm}
          onLocationSelect={onLocationSelect}
        />
      </LocationWrapper>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder='오늘의 날씨는 어떤가요?'
        style={inputStyle}
      />
      <div>
        <input
          type='file'
          name='image'
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <div style={buttonWrapper}>
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button
            type='primary'
            style={{
              float: 'right',
              backgroundColor: '#8D8DAA',
              border: '1px solid #8D8DAA'
            }}
            htmlType='submit'
          >
            올리기
          </Button>
        </div>
      </div>
      <PreviewWrapper>
        {imagePaths.map((v, i) => (
          <div
            key={v}
            style={{
              position: 'relative',
              display: 'flex',
              verticalAlign: 'center',
              marginBottom: '5px'
            }}
          >
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <CloseBtn onClick={onRemoveImage(i)}>X</CloseBtn>
          </div>
        ))}
      </PreviewWrapper>
    </Form>
  );
};

export default PostForm;
