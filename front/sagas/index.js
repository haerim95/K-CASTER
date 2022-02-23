import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';
import weatherSaga from './weather';

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga), fork(weatherSaga)]);
}
