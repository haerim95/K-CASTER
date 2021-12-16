import shortid from 'shortid';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '익명'
      },
      content: '첫번째 게시글 #쿠키자 #고양이',
      Images: [
        {
          id: shortid.generate(),
          src: 'http://newsimg.hankookilbo.com/2019/04/29/201904291390027161_3.jpg'
        },
        {
          id: shortid.generate(),
          src: 'https://t1.daumcdn.net/cfile/tistory/9982424C5F56648032'
        },
        {
          id: shortid.generate(),
          src: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/7FtIGKdjqBMSiqgmvHVqW9hHC2c.jpg'
        }
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: '익명 2'
          },
          content: '추워요'
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: '익명 3'
          },
          content: '나듀 추워요ㅜㅜ'
        }
      ]
    }
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data
});

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '익명 1'
  },
  Images: [],
  Comments: []
});

const dummyComment = data => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '익명 1'
  }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      };
    default:
      return state;
  }
};

export default reducer;
