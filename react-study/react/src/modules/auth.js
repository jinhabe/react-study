import { createAction, handleActions } from 'redux-actions';
import Cookies from 'universal-cookie';

{/* 액션 타입 선언 */}
const SET_AUTH = 'auth/SET_AUTH';
const INIT_AUTH = 'auth/INIT_AUTH';

{/* 액션 함수 선언 */}
export const setAuth = createAction(SET_AUTH, form => form );
export const initAuth = createAction(INIT_AUTH);

{/* 초기값 설정 */}
const inititalState = {
  id: '',
  auth: false,
};

const cookies = new Cookies();

{/* reducer 선언 */}
const auth = handleActions(
    {
      [SET_AUTH]: (state, { payload : form } ) => {
        window.sessionStorage.setItem('userinfo', form.id);
        cookies.set('userinfo', form.id);
        return ({
          ...state,
          id: form.id,
          auth: form.auth
        });
      },
      [INIT_AUTH]: () => {
        return ({...inititalState});
      },
    },
    inititalState,
);

export default auth;