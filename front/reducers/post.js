export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '익명',
      },
      content: '첫번째 게시글 #쿠키자 #고양이',
      Images: [
        {
          src: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg',
        },
        {
          src: 'https://t1.daumcdn.net/cfile/tistory/9982424C5F56648032',
        },
        {
          src: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/7FtIGKdjqBMSiqgmvHVqW9hHC2c.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: '익명 2',
          },
          content: '추워요',
        },
        {
          User: {
            nickname: '익명 3',
          },
          content: '나듀 추워요ㅜㅜ',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터',
  User: {
    id: 1,
    nickname: '익명 1',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
