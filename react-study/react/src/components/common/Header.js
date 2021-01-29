import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { initAuth } from "../../modules/auth";
import Cookies from "universal-cookie";

const HeaderBlock = styled.header`
  width: 100%; height: 50px;
  div { float: left; width: 300px; height: 50px; background: #bedcf1; font-size: 50px; color: #fff; text-align: center; }
  div a { display: block; }
  button { float: right; width: 110px; height: 34px; margin: 15px 30px 0 -1px; background: #bedcf1; border-radius: 5px; font-size: 18px; color: #fff; transition: .5s background; }
  button:hover { background: #319de88f; }
`;

{/* 헤더 컴포넌트 */}
const Header = ({ location, match, history }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const userid = useSelector(({auth}) => auth.id);

  const hanldeLogout = () => {
    dispatch(
      initAuth()
    );
    cookies.remove('TK');
    cookies.remove('userinfo');
    history.push('/');
  };

  if( location.pathname === '/' ) { return (<></>) };

  return (
    <HeaderBlock>
      <div><Link to="/table">로고</Link></div>
      <div>{userid}님</div>
      <button onClick={hanldeLogout}>로그아웃</button>
    </HeaderBlock>
  )
}

export default withRouter(Header);