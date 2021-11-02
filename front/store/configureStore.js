import { createWrapper } from 'next-redux-wrapper';

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: provess.env.NODE_ENV === 'development',
});

export default wrapper;
