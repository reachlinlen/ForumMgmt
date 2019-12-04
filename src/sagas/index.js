import { call, put, takeEvery } from 'redux-saga/effects';

function authentication(dispatch, action) {
  dispatch({ type: 'AUTHENTICATION', auth: action.payload });
}

export default function* rootSaga() {
  yield takeEvery('AUTHENTICATION', authentication);
}
