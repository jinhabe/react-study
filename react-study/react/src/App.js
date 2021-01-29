import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import LoginPage from "./pages/LoginPage";
import TablePage from './pages/TablePage';
import TableWritePage from './pages/TableWritePage';
import TableModifyPage from './pages/TableModifyPage';
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { setAuth } from "./modules/auth";


const App = ({ location, match, history }) => {
  const first = '1';
  const [cookies, setCookies ] = useCookies(['TK']);
  const dispatch = useDispatch();

  // 로그인 유지를 위해 storage 검사 함수
  const initializeUserInfo = () => {
    //if ( typeof(window) !== typeof(undefined) && window.sessionStorage.userinfo !== undefined && cookies.TK !== undefined) {
    if ( typeof(cookies.userinfo) !== typeof(undefined) && typeof(cookies.TK) !== typeof(undefined) ) {
      dispatch(
          setAuth({
            id: cookies.userinfo,
            auth: true,
          })
      );
      if ( location.pathname === '/' ) { history.push('/table'); }
    }
  };

  useEffect(() => {
    initializeUserInfo();
  }, [first]);

  return (
    <>
      <Header/>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/table" component={TablePage} exact={true} />
      <Route path="/tableWrite" component={TableWritePage} exact={true} />
      <Route path="/tableModify" component={TableModifyPage} exact={true} />
    </>
  );
}

export default withRouter(App);
