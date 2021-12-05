import { all, fork, call, put, throttle, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    yield delay(1000);
    // const result = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', login);
}
function* watchLogout() {
  while (true) {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
  }
}
function* watchAddPost() {
  while (true) {
    yield takeLatest('ADD_POST_REQUEST', addPost, 10000);
  }
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
