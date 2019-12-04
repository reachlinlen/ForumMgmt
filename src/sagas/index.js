import { call, put, takeEvery } from 'redux-saga/effects';

function authentication(data, dispatch) {
  dispatch({ type: 'AUTHENTICATION', auth: data.payload });
}

export default function* rootSaga() {
  yield takeEvery('AUTHENTICATION', authentication);
}
