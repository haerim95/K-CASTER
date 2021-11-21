import { Button, Card, Popover } from 'antd';
import React from 'react';
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import ButtonGroup from 'antd/lib/button/button-group';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' />,
          <HeartOutlined key='heart' />,
          <MessageOutlined key='comment' />,
          <Popover
            key='more'
            content={
              <ButtonGroup>
                <Button>수정</Button>
                <Button type='danger'>삭제</Button>
                <Button>신고</Button>
              </ButtonGroup>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Image />
        <Content />
        <Buttons></Buttons>
      </Card>
      <CommentForm />
      <Comments />
    </div>
  );
};

export default PostCard;
