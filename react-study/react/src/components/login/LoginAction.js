import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios/index";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../modules/auth";
import { withRouter } from 'react-router-dom';

const LoginArea = styled.div`
  position: absolute; top: calc(50% - 173px); left: calc(50% - 205px); width: 320px; padding: 45px; border: 1px solid #000; border-radius: 5px;
  
  & h1 { font-size: 36px; margin: 0 0 30px 0; }
  
  & form { width: 100%; }
  & form button,
  & form input { float: left; width: 100%; outline: none; }
  
  & form > button { margin: 25px 0 0 0; box-sizing: border-box; height: 40px; font-size: 20px; text-align: center; line-height: 40px; border-radius: 4px; background: #8cc1e68f; color: #fff; transition: .5s background; }
  & form > button:hover { background: #319de88f; }
  & form > input { float: left; width: 100%; height: 40px; border: none; border-bottom: 2px solid #000; margin: 0 0 10px 0; font-size: 15px; line-height: 32px; color: #000; font-weight: bold; padding: 0 0 0 40px; box-sizing: border-box; }
  & form > input[name=id] { background: url(/img/id.svg) no-repeat 7px 8px; }
  & form > input[name=pwd] { background: url(/img/pwd.svg) no-repeat 7px 8px; }
  & form > input::placeholder { color: #333; }
  & form > input:focus { border-bottom: 2px solid #8cc1e68f; }
  
`;

const LoginAction = ({ location, match, history }) => {
  const [state, setState] = useState({
    id: '',
    pwd: ''
  });
  const dispatch = useDispatch();
  const {auth} = useSelector(auth => auth.auth);
  //
  useEffect(() => {
    return () => {
      history.push('/table');
    }
  }, [auth]);

  {/* 로그인 시도 이벤트 */}
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', state );
      if ( response.status === 200 && response.data.code === 1 ) {
        dispatch(
            setAuth({
              id: state.id,
              auth: true
            })
        );
      } else {
        alert("로그인 실패 " + response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  {/* INPUT 박스 변경 이벤트 */}
  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <LoginArea>
        <h1>Study~</h1>
        <form autoComplete="off" onSubmit={onSubmit}>
          <input tabIndex="1" name="id" type="text" placeholder="아이디" value={state.id} onChange={onChange}/>
          <input tabIndex="2" name="pwd" type="password" placeholder="비밀번호" onChange={onChange} onKeyPress={onChange}/>
          <button tabIndex="3">로그인</button>
        </form>
      </LoginArea>
    </>
  )
}

export default withRouter(LoginAction);